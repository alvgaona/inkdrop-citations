'use babel'

import Cite from 'citation-js'
import Hashids from 'hashids'
import { remote } from 'electron'

const app = remote.app
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/search/searchcursor.js')


const generateReferences = (value, format = "apa", anchor = false) => {
  try {
    const citationsType = Cite.plugins.input.type(value);

    if (citationsType === "@invalid") {
      console.error("Invalid reference type");
      return [];
    }

    let result = Cite(value).format("bibliography", {
      template: format,
      format: "text",
      lang: "en-US",
    }).split("\n").filter(entry => entry != "")

    if (!anchor) {
      return result
    }

    if (format == "vancouver") {
      const re = /(?<=[0-9].\s).*/
      const output = result.map(entry => entry.match(re)[0])
      result = output
    }

    const hashids = new Hashids()
    return result.map(entry => `1. <span id="citations-${hashids.encode(Math.floor(Math.random() * 2 ** 16))}">${entry}</span>`)
  }
  catch (e) {
    console.error(e)
  }
};

const countReferences = (content) => {
  const re = /<span id="citations-.*>.*<\/span>/g
  const count = [...content.matchAll(re)].length
  return count
}

const countCites = (content) => {
  const re = /\[.*\]\(#citations-.*\)/g
  const count = [...content.matchAll(re)].length
  return count
}

const renumberCites = (editor, isVancouver = false) => {
  let re

  re = /<span id="citations-[0-9]+">[0-9]+\..*<\/span>/g

  const cursor = editor.cm.getSearchCursor(re)

  let match = cursor.findNext()
  let index = 1
  while (match != false) {
    let text = match[0]

    text = text.replace(/citations-[0-9]+/, `citations-${index}`)

    editor.cm.replaceRange(text, cursor.from(), cursor.to())

    match = cursor.findNext()
    index++
  }
}


export { generateReferences, countReferences, countCites, renumberCites }
