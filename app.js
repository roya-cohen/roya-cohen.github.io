const cfg = window.AGENT || {};
document.getElementById('agent-name').textContent = `${cfg.name} — Real Estate Agent, Long Island, NY`;
document.getElementById('agent-contact').textContent = `${cfg.phone} • ${cfg.email}`;
document.getElementById('agent-headshot').src = cfg.headshot || '/assets/headshot.jpg';

const listingsEl = document.getElementById('listings');
const emptyEl = document.getElementById('empty');
let LISTINGS = [];

// Modal elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let modalPhotos = [];
let modalIndex = 0;

async function loadListings() {
  try {
    const res = await fetch(cfg.listingsFile || '/listings.json', { cache: "no-store" });
    if (!res.ok) throw new Error('Could not load listings.json');
    LISTINGS = await res.json();
    renderListings(LISTINGS);
  } catch (err) {
    console.error(err);
    emptyEl.textContent = 'Failed to load listings.json. Make sure the file exists in the repo.';
    emptyEl.style.display = 'block';
  }
}

function renderListings(items) {
  if (!items || items.length === 0) {
    listingsEl.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }
  emptyEl.style.display = 'none';
  listingsEl.innerHTML = items.map(cardHTML).join('');
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      openGallery(id);
    });
  });
}

function cardHTML(l) {
  const thumb = (l.photos && l.photos[0]) || '/assets/placeholder.png';
  const price = l.price ? `$${Number(l.price).toLocaleString()}` : 'Price N/A';
  const beds = l.beds !== undefined ? `${l.beds} bd` : '';
  const baths = l.baths !== undefined ? `${l.baths} ba` : '';
  const sqft = l.sqft ? `${l.sqft} sqft` : '';
  const addr = [l.address, l.city, l.state].filter(Boolean).join(', ');
  return `
    <article class="card" data-id="${escapeHtml(l.id || '')}">
      <div class="thumb" style="background-image:url('${escapeHtml(thumb)}')"></div>
      <div class="meta">
        <div>
          <div class="price">${price}</div>
          <div class="addr">${escapeHtml(addr)}</div>
        </div>
        <div class="badges">${[beds, baths, sqft].filter(Boolean).join(' • ')}</div>
      </div>
    </article>
  `;
}

function openGallery(id) {
  const item = LISTINGS.find(x => x.id === id);
  if (!item) return;
  modalPhotos = item.photos && item.photos.length ? item.photos : [];
  modalIndex = 0;
  showModalImage();
  modalCaption.textContent = `${item.title || ''} — ${item.address || ''}`;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function showModalImage() {
  if (!modalPhotos.length) {
    modalImage.src = '/assets/placeholder.png';
    return;
  }
  modalImage.src = modalPhotos[modalIndex];
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

prevBtn.addEventListener('click', () => {
  if (!modalPhotos.length) return;
  modalIndex = (modalIndex - 1 + modalPhotos.length) % modalPhotos.length;
  showModalImage();
});
nextBtn.addEventListener('click', () => {
  if (!modalPhotos.length) return;
  modalIndex = (modalIndex + 1) % modalPhotos.length;
  showModalImage();
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (modal.getAttribute('aria-hidden') === 'false') {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  }
});

// simple escape for inlined HTML
function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// initial
loadListings();
