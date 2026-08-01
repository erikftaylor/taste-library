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
    chip.textContent = entry.name.toUpperCase() + '  ' + entry.count;
    chip.addEventListener('click', function () {
      activeCategoryId = entry.id;
      renderFilters();
      renderSections();
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
  img.src = image.file;
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
  card.addEventListener('click', function () { openModal(image, category); });
  return card;
}

var currentModalImage = null;
var currentModalCategory = null;

function openModal(image, category) {
  currentModalImage = image;
  currentModalCategory = category;

  document.getElementById('modal-img').src = image.file;
  document.getElementById('modal-img').alt = image.title;
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
}

function closeModal() {
  document.getElementById('modal-overlay').hidden = true;
  currentModalImage = null;
  currentModalCategory = null;
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

function init() {
  renderFilters();
  renderSections();
  setupModalHandlers();
}

document.addEventListener('DOMContentLoaded', init);
