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

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
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

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

function wireCopyButton(button, getText) {
  var label = button.textContent;
  var revertTimer = null;
  button.addEventListener('click', function () {
    if (!currentModalImage || !currentModalCategory) return;
    copyToClipboard(getText()).then(function () {
      if (revertTimer) clearTimeout(revertTimer);
      button.textContent = 'Copied!';
      button.classList.add('copied');
      revertTimer = setTimeout(function () {
        button.textContent = label;
        button.classList.remove('copied');
        revertTimer = null;
      }, 1200);
    });
  });
}

function setupCopyButtons() {
  wireCopyButton(document.getElementById('copy-prompt-btn'), function () {
    return TasteContent.buildImagePrompt(currentModalImage, currentModalCategory);
  });
  wireCopyButton(document.getElementById('copy-brief-btn'), function () {
    return TasteContent.buildBrief(currentModalImage, currentModalCategory);
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
  URL.revokeObjectURL(inboxImages[index].previewUrl);
  inboxImages.splice(index, 1);
  renderInbox();
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
