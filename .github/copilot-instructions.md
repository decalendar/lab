# Copilot Instructions

## Project and workflow

This repository is the source for the *Introduction to Human Biology Laboratory Workbook*, a Quarto book published at `https://maptv.github.io/lab`. Root-level `.qmd` files are the book chapters; their order is authoritative in `_quarto.yml` under `book.chapters`. Add, remove, or rename a chapter there as part of any structural change.

The project renders HTML with light and dark themes plus PDF, EPUB, and DOCX download formats. `_book/` and `.quarto/` are generated and ignored; edit source `.qmd`, `_quarto.yml`, stylesheets, and assets rather than rendered output.

Commands (Quarto is supplied by the devcontainer):

```bash
# Render the entire book. This also runs the presentation pre-render step.
quarto render

# Render one book chapter while working on it.
quarto render Laboratory_Exercise_03_Molecules_Water_and_pH.qmd

# Render the RevealJS presentation source only.
quarto render presentation/demo/index.qmd

# Manually publish to GitHub Pages (the workflow publishes pushes to main automatically).
quarto publish gh-pages
```

There are no repository-configured test, lint, formatting, or single-test commands.

## Architecture and publishing

`_quarto.yml` defines the book, global formats/themes, and a `pre-render` command for `presentation/demo/index.qmd`. The presentation has two layers: `presentation/demo/index.qmd` is the RevealJS source, while `presentation/index.qmd` is a book chapter that embeds the generated HTML and PDF through iframes. Keep the demo output paths and the `resources` entries in `presentation/index.qmd` aligned if the deck layout or filenames change. Its included Jupyter notebook has saved output, so the site build does not require R.

`.github/workflows/publish.yml` runs on pushes to `main` and on manual dispatch. It creates `_quarto-github.yml` at build time to point book links at the current repository and branch, then publishes with the `github` Quarto profile to `gh-pages`. Do not commit that generated override file.

## Source conventions

- Preserve existing Quarto/Pandoc syntax and document structure: heading-based sections, fenced divs/callouts, attribute blocks such as `{.unnumbered}` and `{.underline}`, and inline LaTex where present.
- Many lab images are embedded as `data:` URLs directly in `.qmd` files. Avoid broad reformatting or incidental edits to those long lines. Preserve image attributes, especially explicit dimensions and alt text.
- `dark.scss` inverts document images for the dark theme. Add `.no-invert` to image attributes for photographs or colored diagrams that must retain their colors; line-art diagrams should retain the default inversion.
- The front matter establishes the workbook's academic-integrity standard: scientific claims should be accurate and supported by credible sources, citations should be preserved/added as appropriate, and student-facing text must not present AI output as a scientific source or assignment answer.
- Presentation speaker notes use `::: notes`; deck-specific styling belongs in `presentation/demo/styles.css`, while the iframe dimensions on the workbook page belong in `presentation/slide-deck.css`.
