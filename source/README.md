# Site source (MkDocs)

This folder is the **editable source** for the Ethical Hacking course site.
The built site lives at the **repository root** — that's what GitHub Pages serves.
Do **not** hand-edit the built HTML at the root; edit files under `docs/` here, then rebuild.

## One-time setup
```
pip install mkdocs-material
```

## Edit → rebuild → publish
1. Edit pages under `source/docs/` (Markdown) or the nav in `source/mkdocs.yml`.
2. From inside this `source/` folder, build:
   ```
   mkdocs build
   ```
   That generates a `site/` folder here.
3. Copy the **contents** of that `site/` folder to the **repository root**
   (overwrite the existing built files), then commit and push.

Notes:
- Pages are named by topic (e.g. `weeks/cryptography.html`), so week numbers
  can change without breaking links — the week number lives in the page title,
  the nav (mkdocs.yml), and the home schedule (docs/index.md).
- Custom interactive pieces (the click-through strips, red/blue rails) live in
  `docs/stylesheets/extra.css` and `docs/javascripts/extra.js`.
