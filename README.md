# ce8613a3-7174-4160-bbd0-0903f044e2a7

> CLIENT ALIAS: MR. PATRA

## Project Overview
A static e-commerce website for Mr. Patra – a luxury footwear brand. The site includes a marketing homepage (index.html) and a product catalog page (store.html). All product purchases are handled via WhatsApp messaging (no backend).

## File Structure
```python
project/
├── index.html # Brand story, hero section, features
├── store.html # Product grid with all shoes
├── styles/
│   ├── global.css # Shared variables, resets, buttons, fade animations
│   ├── index.css # Homepage specific layouts (hero, features, footer)
│   └── store.css # Catalog grid, product cards, filter row
├── js/
│   └── script.js # Intersection Observer for fade-section (assumed existing)
├── assets/ # Logo, favicon
└── store/ # Product images (950/, 1250/ subfolders)
```


## Design & Styling Approach

### Global Architecture (`global.css`)
- **CSS Custom Properties**: Centralized color palette (gold, dark tones), shadows, transitions.
- **Base Reset**: Minimal margin/padding reset, box-sizing border-box.
- **Typography**: Inter for body, Cormorant Garamond for headings.
- **Reusable Components**:
  - `.primary-button`, `.secondary-button`, `.nav-button` – consistent CTA styling.
  - `.eyebrow` – small uppercase gold label.
  - `.fade-section` – scroll‑triggered fade‑in (used with `script.js`).
- **Responsive Container** – shared width constraint for main sections.

### Page-Specific CSS
- **index.css**: Defines layout for header, hero split‑screen, two‑column about, 3‑column feature grid, callout card, and footer.
- **store.css**: Structures the catalog header, visual category filters, responsive product grid, and product card.

### Product Card Component (store.html)
Each product is wrapped in an `<a class="product_card">` that links to WhatsApp with a pre‑filled message containing product name, price, and image reference.
Inside each card:
- `.product-image` with an `<img>` (aspect-ratio 4:5, zoom on hover).
- `.product-info` containing:
  - `.product_title` – shoe model name.
  - `.product_price` – price in ₹.
  - `.product_desc` – short description (material/comfort feature).

This strict class naming makes it easy for any developer to identify and modify product data.

## How to Maintain / Extend

### Adding a New Product
1. Place new product images inside `/store/` (create a new price folder if needed).
2. In `store.html`, copy an existing `<a class="product_card">` block.
3. Update the `href` WhatsApp link with correct product details and image URL.
4. Change image `src`, update `.product_title`, `.product_price` and `.product_desc`.
5. Ensure each card retains the three required classes.

### Modifying Global Styles
- Adjust colors, spacing, or button styles in `global.css` – changes reflect on both pages.
- Do not duplicate global styles in page‑specific files.

### Scroll Animation
The `.fade-section` class relies on `js/script.js` (Intersection Observer). The script adds `.is-visible` when elements enter the viewport. If you replace the JS, keep the same class logic.

## Dependencies
- Google Fonts: Inter (400/500/600) & Cormorant Garamond (500/600/700)
- No external CSS frameworks – pure custom CSS.

## Browser Support
Modern browsers (Chrome, Firefox, Safari, Edge) due to CSS Grid, `aspect-ratio`, and `backdrop-filter` (if used). Fallbacks are graceful.

## Notes for Developers
- All images are real and unedited – the product grid intentionally uses raw product shots.
- The WhatsApp link uses absolute image references (relative to domain root). When deploying, ensure the domain in WhatsApp messages is updated if needed, but the link will work on any origin because the path is relative.
- No JavaScript build step – pure HTML/CSS/vanilla JS for lightweight hosting.