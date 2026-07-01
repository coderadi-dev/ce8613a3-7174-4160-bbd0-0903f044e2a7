// ==================================================
// ELEMENT REFERENCE
// ==================================================

const filterRow = document.querySelector('.filter-row');
const catalog = document.getElementById('catalog');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO READ ALL FOLDERS IN `STORE` DIRECTORY
/**
 * Attempts to read the store directory by fetching /store/ and parsing
 * the HTML directory listing for sub‑folders, then fetches each sub‑folder
 * listing and extracts .webp file links.
 *
 * WARNING: Very slow, requires multiple HTTP requests, and is server‑specific.
 */
async function loadProductCardsFromDirectoryListing() {
    const base = '/store/';

    // Helper: fetch and parse an autoindex page, returning all links ending with .webp
    async function getWebpLinks(url) {
        try {
            const resp = await fetch(url);
            if (!resp.ok) return [];
            const html = await resp.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a');
            const webpUrls = [];
            links.forEach(a => {
                const href = a.getAttribute('href');
                if (href && href.toLowerCase().endsWith('.webp')) {
                    // Resolve relative URLs (the link often contains just the filename)
                    webpUrls.push(new URL(href, url).pathname);
                }
            });
            return webpUrls;
        } catch (e) {
            console.warn('Failed to read', url, e);
            return [];
        }
    }

    // 1. Get list of product directories from /store/
    const topResp = await fetch(base);
    const topHtml = await topResp.text();
    const topDoc = new DOMParser().parseFromString(topHtml, 'text/html');
    const folderLinks = topDoc.querySelectorAll('a');
    const productFolderNames = [];

    folderLinks.forEach(a => {
        const href = a.getAttribute('href');
        // Typical autoindex folder links end with '/'
        if (href && href.endsWith('/') && !href.startsWith('..') && href !== '/store/') {
            // The link text is usually the folder name, e.g. "950/"
            const folderName = href.replace(/\/$/, ''); // remove trailing slash
            if (/^\d+$/.test(folderName)) { // only numeric product IDs
                productFolderNames.push(folderName);
            }
        }
    });

    // 2. For each product folder, fetch its listing and collect .webp files
    const promises = productFolderNames.map(folder => getWebpLinks(`${base}${folder}/`));
    const allWebpArrays = await Promise.all(promises);

    // 3. Call createProductCard for every found image
    allWebpArrays.flat().forEach(url => createProductCard(url));
}

// * FUNCTION TO CREATE A PRODUCT CARD
function createProductCard(
    product_title,
    product_price,
    product_image
) {
    // Create main container
    const mainContainer = document.createElement('a');
    mainContainer.href = `https://wa.me/9044791312?text=Hello, I wanna buy this product: ${product_title} for ₹${product_price.toFixed(2)}.\n\nProduct Link: ${window.location.origin}/${product_image}`;
    mainContainer.classList.add('product_card');

    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('product-image');

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = product_image;
    imageElement.alt = product_title;

    // Create product info container
    const productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('product-info');

    // Create product title element
    const titleElement = document.createElement('h3');
    titleElement.classList.add('product_title');
    titleElement.textContent = product_title;

    // Create product price element
    const priceElement = document.createElement('span');
    priceElement.classList.add('product_price');
    priceElement.textContent = `$${product_price.toFixed(2)}`;

    // Create product description element
    // const descriptionElement = document.createElement('p');
    // descriptionElement.classList.add('product_description');
    // descriptionElement.textContent = product_description;

    // Append elements
    imageContainer.appendChild(imageElement);

    productInfoContainer.appendChild(titleElement);
    productInfoContainer.appendChild(priceElement);
    // productInfoContainer.appendChild(descriptionElement);

    mainContainer.appendChild(imageContainer);
    mainContainer.appendChild(productInfoContainer);

    catalog.appendChild(mainContainer);
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & INITIAL DISPLAY SETTINGS
document.addEventListener('DOMContentLoaded', async () => {
    // Load Streed Luxe Series
    for (let i = 0; i < 9; i++) {
        createProductCard(
            'Street Luxe',
            950,
            `store/950/${i}.webp`
        );
    }

    // Load Luxe Strada Series
    for (let i = 0; i < 6; i++) {
        createProductCard(
            'Luxe Strada',
            1250,
            `store/1250/${i}.webp`
        );
    }

    // Load Luxe Capri Series
    for (let i = 0; i < 18; i++) {
        createProductCard(
            'Luxe Capri',
            2599,
            `store/2599/${i}.webp`
        );
    }
});