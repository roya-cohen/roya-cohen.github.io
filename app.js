let listings = [];

fetch('/listings.json', { cache: 'no-store' })
  .then(r => r.json())
  .then(data => {
    listings = data;
    renderListings();
  });

function renderListings(){
  const container = document.getElementById('listings');
  container.innerHTML = '';
  listings.forEach((l, idx) => {
    container.appendChild(createListing(l, idx));
  });
}

function createListing(l, idx){
  let current = 0;

  const root = document.createElement('article');
  root.className = 'listing';

  const carousel = document.createElement('div');
  carousel.className = 'carousel';

  const img = document.createElement('img');
  img.src = l.photos[0];
  carousel.appendChild(img);

  const prev = document.createElement('button');
  prev.className = 'prev';
  prev.textContent = '‹';
  prev.onclick = () => {
    current = (current - 1 + l.photos.length) % l.photos.length;
    img.src = l.photos[current];
  };

  const next = document.createElement('button');
  next.className = 'next';
  next.textContent = '›';
  next.onclick = () => {
    current = (current + 1) % l.photos.length;
    img.src = l.photos[current];
  };

  carousel.appendChild(prev);
  carousel.appendChild(next);

  const body = document.createElement('div');
  body.className = 'listing-body';
  body.innerHTML = `
    <div class="price">$${Number(l.price).toLocaleString()}</div>
    <div class="address">${l.address}, ${l.city}, ${l.state}</div>
    <div class="details">${l.beds} Beds · ${l.baths} Baths · ${l.sqft} Sq Ft</div>
    <div class="description">${l.description}</div>
  `;

  root.appendChild(carousel);
  root.appendChild(body);
  return root;
}
