# Timothy documentation

Public documentation for [Timothy](https://github.com/timothy-agent/timothy), the self-hosted personal AI assistant. The site is built with Astro Starlight.

Site: https://timothy-agent.github.io/docs/

## Run locally

You only need Docker. Every command runs Node inside a container, so you do not install Node on your machine.

Install the dependencies:

```sh
make install
```

Start the dev server at http://localhost:4321/docs/:

```sh
make dev
```

Build the site into `dist/`. The build fails if an internal link is broken:

```sh
make build
```

`make check` runs the same build. `make preview` serves the built site on port 4321.

## How pages are organised

Pages live in `src/content/docs/`. Each folder is one sidebar section:

| Folder | Section |
|---|---|
| `install` | Install |
| `first-run` | First run |
| `concepts` | Concepts |
| `connectors` | Connectors and channels |
| `settings` | Settings reference |
| `troubleshooting` | Troubleshooting |
| `release-notes` | Release notes |

The sidebar lists the pages in each folder on its own. To add a page, create a Markdown file in the right folder with a `title` and a `description` in its front matter.

## Contributing

Open a pull request. CI builds the site and checks the links, and the build must pass before merge. A merge deploys the site to GitHub Pages.

## Writing rules

- Write plain English. Use short sentences with one idea each.
- Do not use em dashes. Use a colon, a comma or a new sentence.
- Do not name files or code identifiers in the text unless the reader must type them.
- Put every command in a fenced code block.
- Check every instruction against the current app before you write it.

## License

AGPL-3.0, the same license as Timothy. See [LICENSE](LICENSE).
