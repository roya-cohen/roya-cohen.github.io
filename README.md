Roya Cohen — Static GitHub Pages real estate site (search removed, carousel-only)

Files included in the ZIP:
  - index.html
  - styles.css
  - config.js (edit contact/headshot if needed)
  - app.js (loads listings.json and shows carousel modal)
  - listings.json (sample listings)
  - assets/headshot.jpg (placeholder - replace with real photo)
  - assets/placeholder.png (generic image fallback)
  - assets/listings/<listing-id>/photo-*.jpg (sample listing photos)

Quick setup (GitHub Pages):
  1. Create a new GitHub repository (public is fine).
  2. Upload the contents of this ZIP into the repository root (you can drag & drop in the web UI).
  3. In GitHub: Settings -> Pages -> Source: main branch, root folder -> Save.
  4. Your site will be available at:
     https://<your-github-username>.github.io/<repo>/
  5. After the site is live, edit the JSON-LD block in index.html to replace the two instances of
     https://<your-github-username>.github.io/<repo>/ with your real Pages URL (helps SEO).

Adding or updating a listing:
  - Create a folder: assets/listings/<listing-id>/
  - Add photos: photo-1.jpg (primary), photo-2.jpg, ...
  - Edit listings.json: add an object with id matching the folder, photos paths, and metadata.
  - Commit & push or upload via GitHub UI. GitHub Pages publishes automatically.

Notes:
  - Search/filter UI removed as requested; site shows all listings and each card opens a photo carousel.
  - Replace assets/headshot.jpg with Roya's real headshot (suggested 800x800 px).
  - Images are placeholders in this ZIP. Replace with real photos before sharing the site.
