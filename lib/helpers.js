'use babel'

import Cite from 'citation-js'
import { remote } from 'electron'

const app = remote.app
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/search/searchcursor.js')

const generateReferences = (value, fmt = "apa", offset = 0, anchor = false) => {
  try {
    const citationsType = Cite.plugins.input.type(value);

    if (citationsType === "@invalid") {
      console.error("Invalid reference type");
      return [];
    }

    const result = Cite(value).format("bibliography", {
      template: fmt,
      format: "text",
      lang: "en-US",
    }).split("\n").filter(entry => entry != "")

    if (!anchor) {
      return result
    }

    if (fmt == "vancouver") {
      return result.map((entry, index) => `<span id="citations-${index + offset + 1}">${entry}</span>`)
    }

    return result.map((entry, index) => `[${index + offset + 1}] <span id="citations-${index + offset + 1}">${entry}</span>`)
  }
  catch (e) {
    console.error(e)
  }
};

const countReferences = (content) => {
  const re = /\[[0-9]\]\s<span id="citations-[0-9]+">.*<\/span>/g
  const count = [...content.matchAll(re)].length
  return count
}

const renumberCites = (editor, isVancouver = false) => {
  let re

  if (isVancouver) {
    re = /<span id="citations-[0-9]+">[0-9]+\..*<\/span>/g
  } else {
    re = /\[[0-9]+\]\s<span id="citations-[0-9]+">.*<\/span>/g
  }

  const cursor = editor.cm.getSearchCursor(re)

  let match = cursor.findNext()
  let index = 1
  while (match != false) {
    let text = match[0]

    text = text.replace(/(\[[0-9]+|[0-9]+\.)\]/, `[${index}]`)
    text = text.replace(/citations-[0-9]+/, `citations-${index}`)

    editor.cm.replaceRange(text, cursor.from(), cursor.to())

    match = cursor.findNext()
    index++
  }
}


export { generateReferences, countReferences, renumberCites }
