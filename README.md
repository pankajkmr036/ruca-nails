# Ruca Nails website

The static catalog site for [Ruca Nails](https://www.instagram.com/ruca_nails/), built with [Astro](https://astro.build).

**Live site:** https://pankajkmr036.github.io/ruca-nails/

Every push to `main` rebuilds and redeploys the site automatically through GitHub Actions in about a minute.

## Editing content (no coding needed)

You can edit any of these files directly on GitHub: open the file, click the ✏️ pencil icon, make your change, and click **Commit changes**.

| What you want to change | File |
|---|---|
| Store name, WhatsApp number, Instagram, announcement bar, home page text | `src/config/site.yaml` |
| Products | `src/content/products/` (one `.yaml` file per product) |
| Services and prices | `src/content/services/` (one `.yaml` file per service) |
| Nail shapes page | `src/content/shapes.yaml` |
| Care guide and FAQ | `src/content/faq.yaml` |
| Photos | `public/images/products/`, `public/images/shapes/` and `public/images/services/` |

### Add a product
1. Upload the photo to `public/images/products/` (on GitHub: **Add file** → **Upload files**). Square photos of at least 800×800 px look best.
2. In `src/content/products/`, copy an existing file and give it a new name, such as `rose-gold-glam.yaml`. The file name becomes the page address: `/shop/rose-gold-glam`.
3. Fill in the fields:

```yaml
name: Rose gold glam
price: 899
compareAtPrice: 1099        # optional, shows the old price struck through and a "Sale" badge
shape: almond               # almond | squoval | coffin | square | stiletto | oval
length: medium              # short | medium | long
style: [glitter, metallic]  # used by the shop filters
images: [rose-gold-glam.webp, rose-gold-glam-2.jpg]   # first image is the main one
description: Shimmering rose gold with a mirror-chrome accent nail.
featured: true              # optional, shows it under "Hot right now" on the home page
available: true             # optional, set to false to show "Sold out"
sizes: [XS, S, M, L]        # optional
order: 1                    # optional, lower numbers appear first
```

To **remove** a product, delete its file. To **hide** one temporarily, set `available: false`.

### Add a service
Copy a file in `src/content/services/` and edit it. Use either `price: 699` or `priceFrom: 999`, which displays as "From ₹999". Services are grouped on the page by `category`.

### Turn on WhatsApp ordering
In `src/config/site.yaml`, set `whatsapp: "919876543210"`: the country code plus your number, digits only. Until you do, every order button opens Instagram instead.

### Mistakes are caught for you
If a file has a typo, such as a missing price, an unknown shape or a photo that doesn't exist, the build fails and the live site **keeps showing the previous version**. The error message in the repo's **Actions** tab tells you exactly which file and field to fix.

## Starter photos
The current product and shape photos were cropped from the design mockups, so they're low resolution. Replace them with real photos as you have them, keeping the same file names, or update the `images:` list.

To regenerate the crops: `npm run crop -- "/path/to/mockups"`.

## Running locally (optional)
Requires Node 22.12 or later.

```sh
npm install
npm run dev       # http://localhost:4321/ruca-nails/
npm run build     # outputs to dist/
```

## Custom domain
To use a domain such as `rucanails.in`:
1. In `astro.config.mjs`, set `site: 'https://rucanails.in'` and `base: '/'`.
2. Add a `public/CNAME` file containing `rucanails.in`.
3. Point the domain's DNS to GitHub Pages, then set the domain under **Settings** → **Pages**.
