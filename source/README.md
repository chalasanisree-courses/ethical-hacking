# Site source (MkDocs)
Editable source for the Ethical Hacking site. Built site is at the repo root (Pages serves it).
Edit under `docs/`, run `mkdocs build` (needs `pip install mkdocs-material`), copy the generated
`site/` contents to the repo root. Interactive SVG diagrams are inline in the week pages; do not
run them back through an HTML→Markdown converter (it base64-encodes and breaks them).
