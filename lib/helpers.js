'use babel'

import Cite from 'citation-js'

const generateReferences = (value, fmt = "apa", offset = 0, anchor = false) => {
  try {
    const citationsType = Cite.plugins.input.type(value);

    if (citationsType === "@invalid") {
      console.error("Invalid reference type");
      return ["Invalid reference type"];
    }

    const result = Cite(value).format("bibliography", {
      template: fmt,
      format: "text",
      lang: "en-US",
    }).split("\n").filter(entry => entry != "")

    if (!anchor) {
      return result
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


export { generateReferences, countReferences }
