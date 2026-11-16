# samuraijon.com

Personal site of Dr Jonathan Wei. It's a static site built by GitHub Pages (Jekyll) and edited through [Pages CMS](https://pagescms.org).

## Editing content (no code)

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Open this repository. The sidebar shows:
   - **Pages**: heading, lead line and header photo for each page, plus the page body (HTML).
   - **Lists**: Projects & experiments, Creative media, Experience & education, Languages, Tripoints & border crossings, Social links, Menu.
   - **Site settings**: the contact form endpoint.
3. Edit and press **Save**. Every save is a commit, and GitHub Pages republishes the site in about a minute.

Photos go in `images/` (upload them from the CMS media library). If a header photo or project photo is empty, the illustrated placeholder is shown instead.

Project and creative entries take a **Full write-up** (rich text). When it's filled in, it replaces the placeholder text on that entry's detail page.

## Where things live

| Path | What it is |
|---|---|
| `*.html` | One file per page: settings at the top, page body below |
| `_layouts/default.html` | Shared header, menu, footer and scripts |
| `_includes/icons.html` | Social icon row |
| `_data/*.yml` | All lists (projects, timeline, languages, menu, social links, settings) |
| `site.js` | Menu, illustrations, project grids, stage-profile chart |
| `style.css` | All styling |
| `.pages.yml` | Pages CMS configuration |

## Publishing (one-time setup)

1. In this repo: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
2. The site appears at `https://<username>.github.io/<repo>/`. Links and photos are relative, so the site works there and on your own domain.
3. Custom domain: in **Settings → Pages**, enter `samuraijon.com`. Then at your domain registrar, point the domain to GitHub Pages: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a CNAME for `www` to `<username>.github.io`. Turn on **Enforce HTTPS** once the certificate is issued. Doing this takes the domain off Google Sites, so switch only when you're happy with the new site.

## Contact form

GitHub Pages can't send email. Create a free form at [Formspree](https://formspree.io) (or a similar service) and paste its endpoint URL into **Site settings** in the CMS. Until then, the form tells visitors it isn't connected yet.
