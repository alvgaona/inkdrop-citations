'use babel'

import Cite from 'citation-js'
import Hashids from 'hashids'

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

export { generateReferences, countReferences, countCites }
