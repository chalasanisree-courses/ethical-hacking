# Site source (MkDocs)
Built site is at the repo root (Pages serves it). Edit under docs/, run `mkdocs build`
(needs `pip install mkdocs-material`), copy the generated site/ contents to the repo root.
Interactive SVG diagrams are inline in the week pages, each wrapped in <div markdown="0"> so the
Markdown engine leaves them alone. Do not run pages back through an HTML->Markdown converter.
