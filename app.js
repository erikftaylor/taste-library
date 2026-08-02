var activeCategoryId = 'all';

function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

function renderFilters() {
  var container = document.getElementById('filters');
  container.textContent = '';
  var counts = TasteContent.computeCategoryCounts(TASTE_DATA.categories, TASTE_DATA.images);

  counts.forEach(function (entry) {
    var chip = document.createElement('div');
    chip.className = 'chip' + (entry.id === activeCategoryId ? ' active' : '');
    chip.textContent = entry.name + '  ' + entry.count;
    chip.tabIndex = 0;
    chip.setAttribute('role', 'button');

    var selectChip = function () {
      activeCategoryId = entry.id;
      renderFilters();
      renderSections();
    };
    chip.addEventListener('click', selectChip);
    chip.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectChip();
      }
    });

    container.appendChild(chip);
  });
}

function renderSections() {
  var container = document.getElementById('category-sections');
  container.textContent = '';

  TASTE_DATA.categories.forEach(function (category) {
    if (activeCategoryId !== 'all' && activeCategoryId !== category.id) return;

    var images = TasteContent.filterImagesByCategory(TASTE_DATA.images, category.id);
    if (images.length === 0) return;

    var section = document.createElement('div');
    section.className = 'category-section';

    var heading = document.createElement('div');
    heading.className = 'category-heading';
    var h2 = document.createElement('h2');
    h2.textContent = category.name;
    heading.appendChild(h2);
    var count = document.createElement('span');
    count.className = 'category-count';
    count.textContent = images.length + ' reference' + (images.length === 1 ? '' : 's');
    heading.appendChild(count);
    section.appendChild(heading);

    var desc = document.createElement('div');
    desc.className = 'category-desc';
    desc.textContent = category.description;
    section.appendChild(desc);

    var vocabRow = document.createElement('div');
    vocabRow.className = 'vocab-row';
    category.vocabulary.forEach(function (term) {
      var chip = document.createElement('span');
      chip.className = 'vocab-chip';
      chip.textContent = term;
      vocabRow.appendChild(chip);
    });
    section.appendChild(vocabRow);

    var grid = document.createElement('div');
    grid.className = 'grid';
    images.forEach(function (image, index) {
      grid.appendChild(createCard(image, category, index, images.length));
    });
    section.appendChild(grid);

    container.appendChild(section);
  });
}

function createCard(image, category, index, total) {
  var card = document.createElement('div');
  card.className = 'card';

  var imageWrap = document.createElement('div');
  imageWrap.className = 'card-image';
  var img = document.createElement('img');
  img.src = image.thumb;
  img.alt = image.title;
  imageWrap.appendChild(img);
  card.appendChild(imageWrap);

  var body = document.createElement('div');
  body.className = 'card-body';

  var title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = image.title;
  body.appendChild(title);

  var descriptor = document.createElement('div');
  descriptor.className = 'card-descriptor';
  descriptor.textContent = image.descriptor;
  body.appendChild(descriptor);

  var tags = document.createElement('div');
  tags.className = 'card-tags';
  var shown = image.keywords.slice(0, 2);
  var remaining = image.keywords.length - shown.length;
  shown.forEach(function (keyword) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = keyword;
    tags.appendChild(tag);
  });
  if (remaining > 0) {
    var more = document.createElement('span');
    more.className = 'tag';
    more.textContent = '+' + remaining;
    tags.appendChild(more);
  }
  body.appendChild(tags);

  var footer = document.createElement('div');
  footer.className = 'card-footer';
  var badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = '◆ ' + category.name;
  footer.appendChild(badge);
  var indexEl = document.createElement('span');
  indexEl.textContent = pad(index + 1) + ' / ' + pad(total);
  footer.appendChild(indexEl);
  body.appendChild(footer);

  card.appendChild(body);
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Open details for ' + image.title);

  var openThisModal = function () { openModal(image, category); };
  card.addEventListener('click', openThisModal);
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openThisModal();
    }
  });

  return card;
}

var currentModalImage = null;
var currentModalCategory = null;
var lastFocusedElement = null;

function openModal(image, category) {
  currentModalImage = image;
  currentModalCategory = category;
  lastFocusedElement = document.activeElement;

  var modalImg = document.getElementById('modal-img');
  modalImg.src = image.display;
  modalImg.alt = image.title;
  document.getElementById('modal-title').textContent = image.title;
  document.getElementById('modal-badge').textContent = '◆ ' + category.name;
  document.getElementById('modal-descriptor').textContent = image.descriptor;

  renderColors(document.getElementById('modal-colors'), image);
  renderContrast(document.getElementById('modal-contrast'), image);

  var tagsContainer = document.getElementById('modal-tags');
  tagsContainer.textContent = '';
  image.keywords.forEach(function (keyword) {
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = keyword;
    tagsContainer.appendChild(tag);
  });

  renderRecipe(document.getElementById('modal-recipe'), image, category);

  document.getElementById('modal-overlay').hidden = false;
  document.getElementById('modal-close-btn').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').hidden = true;
  currentModalImage = null;
  currentModalCategory = null;
  hideCopyFallback();

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function renderColors(container, image) {
  container.textContent = '';
  if (!image.colors || image.colors.length === 0) return;

  var label = document.createElement('div');
  label.className = 'modal-colors-label';
  label.textContent = 'Color Palette';
  container.appendChild(label);

  var grid = document.createElement('div');
  grid.className = 'modal-colors-grid';

  image.colors.forEach(function (color) {
    var item = document.createElement('div');
    item.className = 'modal-color-item';

    var swatch = document.createElement('div');
    swatch.className = 'modal-color-swatch';
    swatch.style.backgroundColor = color.hex;
    item.appendChild(swatch);

    var info = document.createElement('div');
    info.className = 'modal-color-info';

    var name = document.createElement('div');
    name.className = 'modal-color-name';
    name.textContent = color.name;
    info.appendChild(name);

    var hex = document.createElement('div');
    hex.className = 'modal-color-hex';
    hex.textContent = color.hex;
    info.appendChild(hex);

    if (color.usage) {
      var usage = document.createElement('div');
      usage.className = 'modal-color-usage';
      usage.textContent = color.usage;
      info.appendChild(usage);
    }

    item.appendChild(info);
    grid.appendChild(item);
  });

  container.appendChild(grid);
}

function renderContrast(container, image) {
  container.textContent = '';
  var pairs = TasteContent.buildContrastPairs(image);
  if (pairs.length === 0) return;

  var label = document.createElement('div');
  label.className = 'modal-colors-label';
  label.textContent = 'Contrast — computed from the palette';
  container.appendChild(label);

  var list = document.createElement('div');
  list.className = 'modal-contrast-list';

  pairs.slice(0, 4).forEach(function (pair) {
    var row = document.createElement('div');
    row.className = 'modal-contrast-row';

    var sample = document.createElement('span');
    sample.className = 'modal-contrast-sample';
    sample.style.backgroundColor = pair.ground.hex;
    sample.style.color = pair.mark.hex;
    sample.textContent = 'Aa';
    row.appendChild(sample);

    var names = document.createElement('span');
    names.className = 'modal-contrast-names';
    names.textContent = pair.mark.name + (pair.oriented ? ' on ' : ' / ') + pair.ground.name;
    row.appendChild(names);

    var ratio = document.createElement('span');
    ratio.className = 'modal-contrast-ratio';
    ratio.textContent = pair.ratio.toFixed(1) + ':1';
    row.appendChild(ratio);

    var level = document.createElement('span');
    level.className = 'modal-contrast-level level-' + pair.level.replace(/\s+/g, '-').toLowerCase();
    level.textContent = pair.level;
    row.appendChild(level);

    list.appendChild(row);
  });

  container.appendChild(list);

  var warning = TasteContent.contrastWarning(pairs);
  if (warning) {
    var note = document.createElement('div');
    note.className = 'modal-contrast-warning';
    note.textContent = warning;
    container.appendChild(note);
  }
}

function renderRecipe(container, image, category) {
  container.textContent = '';
  var parts = TasteContent.buildImagePromptParts(image, category);

  var subjectSpan = document.createElement('span');
  subjectSpan.className = 'subject';
  subjectSpan.textContent = '[SUBJECT: ' + parts.subject + ']';
  container.appendChild(subjectSpan);

  container.appendChild(document.createTextNode(' ' + parts.rest));
}

function setupModalHandlers() {
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);

  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target.id === 'modal-overlay') closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

function legacyCopy(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  var ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function copyToClipboard(text) {
  // The async API rejects for reasons that have nothing to do with support —
  // NotAllowedError when the document is not focused, for one. The original code
  // only fell back when the API was *absent*, so a rejection meant the click did
  // nothing at all: no copy, no fallback, no message.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () {
      if (legacyCopy(text)) return;
      throw new Error('clipboard unavailable');
    });
  }
  return legacyCopy(text) ? Promise.resolve() : Promise.reject(new Error('clipboard unavailable'));
}

var copyStatusTimer = null;

function revealCopyFallback(text) {
  var box = document.getElementById('modal-copy-fallback');
  if (!box) return;
  box.value = text;
  box.hidden = false;
  box.focus();
  box.select();
}

function hideCopyFallback() {
  var box = document.getElementById('modal-copy-fallback');
  if (box) {
    box.hidden = true;
    box.value = '';
  }
  var status = document.getElementById('modal-copy-status');
  if (status && status.classList.contains('failed')) {
    status.hidden = true;
    status.textContent = '';
    status.classList.remove('failed');
  }
}

function showCopyStatus(message, failed) {
  var status = document.getElementById('modal-copy-status');
  if (!status) return;
  if (copyStatusTimer) clearTimeout(copyStatusTimer);
  copyStatusTimer = null;
  status.textContent = message;
  status.classList.toggle('failed', !!failed);
  status.hidden = false;
  // A success message is transient. A failure is not: it explains the textarea
  // sitting right below it, so it stays until the next copy or until the modal
  // closes — otherwise the instruction vanishes while the thing it describes
  // is still on screen.
  if (!failed) {
    copyStatusTimer = setTimeout(function () {
      status.hidden = true;
      status.textContent = '';
      copyStatusTimer = null;
    }, 3000);
  }
}

function wireCopyButton(button, what, getText) {
  var label = button.textContent;
  var revertTimer = null;
  button.addEventListener('click', function () {
    if (!currentModalImage || !currentModalCategory) return;
    var text = getText();
    copyToClipboard(text).then(function () {
      if (revertTimer) clearTimeout(revertTimer);
      button.textContent = 'Copied!';
      button.classList.add('copied');
      revertTimer = setTimeout(function () {
        button.textContent = label;
        button.classList.remove('copied');
        revertTimer = null;
      }, 1200);
      hideCopyFallback();
      showCopyStatus('✓ ' + what + ' copied to clipboard — ' +
        text.length.toLocaleString() + ' characters', false);
    }).catch(function () {
      // Never fail silently, and never leave the text unreachable. Some contexts
      // block both the async API and execCommand outright — an embedded browser
      // pane, for one — so surface the text pre-selected and let the user press
      // the shortcut themselves. A message alone would not actually deliver it.
      revealCopyFallback(text);
      showCopyStatus('Clipboard is blocked here. ' + what + ' is selected below — press ' +
        (navigator.platform.indexOf('Mac') === 0 ? '⌘C' : 'Ctrl+C') + ' to copy.', true);
    });
  });
}

function setupCopyButtons() {
  wireCopyButton(document.getElementById('copy-prompt-btn'), 'Image prompt', function () {
    return TasteContent.buildImagePrompt(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-brief-btn'), 'Design brief', function () {
    return TasteContent.buildBrief(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-css-btn'), 'CSS variables', function () {
    return TasteContent.buildCssTokens(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-tailwind-btn'), 'Tailwind theme', function () {
    return TasteContent.buildTailwindTokens(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-json-btn'), 'JSON tokens', function () {
    return TasteContent.buildJsonTokens(currentModalImage, currentModalCategory);
  });
}

var inboxImages = [];
var inboxIdCounter = 0;

function addFilesToInbox(fileList) {
  Array.prototype.forEach.call(fileList, function (file) {
    if (!file.type || file.type.indexOf('image/') !== 0) return;
    inboxIdCounter += 1;
    inboxImages.push({
      id: 'inbox-' + inboxIdCounter,
      file: file,
      name: file.name,
      previewUrl: URL.createObjectURL(file)
    });
  });
  renderInbox();
}

function removeFromInbox(id) {
  var index = -1;
  inboxImages.forEach(function (item, i) { if (item.id === id) index = i; });
  if (index === -1) return;
  var previewUrl = inboxImages[index].previewUrl;
  inboxImages.splice(index, 1);
  renderInbox();
  // Revoke only once the <img> referencing this URL is out of the DOM. Revoking
  // first leaves a live element pointing at a dead URL, which the browser logs
  // as a failed blob: fetch.
  URL.revokeObjectURL(previewUrl);
}

function downloadInboxItem(id) {
  var item = null;
  inboxImages.forEach(function (i) { if (i.id === id) item = i; });
  if (!item) return;
  var link = document.createElement('a');
  link.href = item.previewUrl;
  link.download = item.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function renderInbox() {
  var grid = document.getElementById('inbox-grid');
  grid.textContent = '';
  inboxImages.forEach(function (item) {
    var card = document.createElement('div');
    card.className = 'inbox-card';

    var img = document.createElement('img');
    img.src = item.previewUrl;
    img.alt = item.name;
    card.appendChild(img);

    var body = document.createElement('div');
    body.className = 'inbox-card-body';

    var badge = document.createElement('span');
    badge.className = 'inbox-badge';
    badge.textContent = '◇ Uncategorized';
    body.appendChild(badge);

    var name = document.createElement('div');
    name.className = 'inbox-card-name';
    name.textContent = item.name;
    body.appendChild(name);

    var actions = document.createElement('div');
    actions.className = 'inbox-actions';

    var downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', function () { downloadInboxItem(item.id); });
    actions.appendChild(downloadBtn);

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function () { removeFromInbox(item.id); });
    actions.appendChild(removeBtn);

    body.appendChild(actions);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function setupDropzone() {
  var dropzone = document.getElementById('dropzone');
  var fileInput = document.getElementById('file-input');
  var pickerBtn = document.getElementById('file-picker-btn');

  pickerBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function (e) {
    addFilesToInbox(e.target.files);
    fileInput.value = '';
  });

  dropzone.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });
  dropzone.addEventListener('dragleave', function () {
    dropzone.classList.remove('dragover');
  });
  dropzone.addEventListener('drop', function (e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    addFilesToInbox(e.dataTransfer.files);
  });
}

function init() {
  renderFilters();
  renderSections();
  setupModalHandlers();
  setupCopyButtons();
  setupDropzone();
}

document.addEventListener('DOMContentLoaded', init);
