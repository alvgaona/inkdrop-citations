# citations

This plugin allows to easily manage your references in the Markdown files.

## Features

- Paste any citation database and automatically append it in the Markdown file.
- Supports multiple database formats, e.g., BibTeX, BibJSON, CSL-JSON, RIS.
- Preview multiple citation formats, e.g., APA, Vancouver, Harvard.
- Renumbers references if cites are out of order or missing a number.

## Install

```shell
ipm install citations
```

## Usage

There are only so many commands to use this plugin.

1. You can preview the supported input and output formats.

    ![Preview](img/preview.gif)

1. It is possible to append references by pasting the bibliography database content into the textbox,
choosing the header text and the output format.

    ![Add](img/add.gif)

1. Last and not least, you have the possibiity to count number of references.

    ![Renumber](img/count.gif)

### Keyboard Shortcuts

- `Ctrl+Alt A` or `⌃⌥A`: Append references.
- `Ctrl+Alt P` or `⌃⌥P`: Preview formats.
- `Ctrl+Alt C` or `⌃⌥C`: Count references.
- `Ctrl+Alt H` or `⌃⌥H`: Help dialog.

## Tips & Tricks

1. After you add your references you will find that each reference has a unique id of the form `citations-<randomId>`. Then, you'd need to use this id in any of the links within your article by doing `[1](#citations-Mw3R)`. This will render a link so when you click it, it'll redirect you to the corresponding reference.

## License

Licensed under the [MIT License](LICENSE).
