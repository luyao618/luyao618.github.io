# luyao618.github.io

Personal GitHub Pages site for technical writing, project notes, resume/CV, and portfolio content.

This site is built with [al-folio](https://github.com/alshedivat/al-folio), a Jekyll theme adapted here for a personal engineering blog instead of an academic homepage.

## Local Development

Install Ruby and Node dependencies:

```bash
BUNDLE_PATH=vendor/bundle bundle install
npm ci
```

Run a production build:

```bash
JEKYLL_ENV=production BUNDLE_PATH=vendor/bundle bundle exec jekyll build
```

Run the style contract check:

```bash
npm run lint:style-contract
```

## Content

- Blog posts live in `_posts/`.
- Page content lives in `_pages/`.
- CV data lives in `_data/cv.yml`.
- Social links live in `_data/socials.yml`.
- Repository page settings live in `_data/repositories.yml`.

## Deployment

The site is intended to deploy with the al-folio GitHub Actions workflow.

For `luyao618.github.io`, GitHub Pages should be configured to deploy from the `gh-pages` branch, with Actions workflow permissions set to read and write.
