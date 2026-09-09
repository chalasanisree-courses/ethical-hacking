# Site source (MkDocs)
Built site is at the repo root (Pages serves it). Edit under docs/, run `mkdocs build`
(needs `pip install mkdocs-material`), copy the generated site/ contents to the repo root.
- Left nav is hidden site-wide via `hide: [navigation]` front matter on each page (home + next/prev cover navigation).
- Interactive SVG diagrams are inline, wrapped in <div markdown="0">. Do not run pages back through
  an HTML->Markdown converter (it base64-encodes SVGs and rewrites <small>/<b> tags, breaking styling).
