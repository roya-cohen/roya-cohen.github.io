fetch('listings.json')
  .then(res => res.json())
  .then(data => {
    renderListings(data.active, 'active-listings', false);
    renderListings(data.sold, 'sold-listings', true);

    document.getElementById('more-sold-link').href = data.moreSoldLink;
  });

function renderListings(listings, containerId, isSold) {
  const container = document.getElementById(containerId);

  listings.forEach(listing => {
    const card = document.createElement('a');
    card.className = 'listing-card';
    card.href = listing.zillowUrl;
    card.target = '_blank';
    card.rel = 'noopener';

    card.innerHTML = `
      <img
        src="${listing.photos[0]}"
        alt="Photo of ${listing.address}"
        class="listing-image"
      />

      <div class="listing-info">
        <h3>${listing.address}</h3>

        <p class="price">
          ${isSold
            ? `Sold for $${listing.price.toLocaleString()}`
            : `$${listing.price.toLocaleString()}`
          }
        </p>

        ${listing.beds ? `<p>${listing.beds} bd · ${listing.baths} ba</p>` : ''}
        ${listing.soldDate ? `<p class="sold-date">Sold ${listing.soldDate}</p>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}
