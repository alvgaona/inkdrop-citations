'use babel';

import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from 'inkdrop';
import Cite from 'citation-js';

import inputSamples from './input-samples'

const CitationsPreview = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const view = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:preview': view
    })
    return () => sub.dispose()
  }, [view])

  useEffect(() => {
    setInput(inputSamples.filter(sample => sample.type == inputType)[0].value)
    return () => {}
  })

  const [input, setInput] = useState("")
  const [inputType, setInputType] = useState("BibTeX")
  const [format, setFormat] = useState("");

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };

  const onChangeInputType = (event) => {
    setInputType(event.target.value)
    const sample = inputSamples.filter(sample => sample.type == event.target.value)[0]
    setInput(sample.value)
  }

  const generateReference = (value) => {
    try {
      const citationsType = Cite.plugins.input.type(value);

      if (citationsType === "@invalid") {
        console.error("Invalid reference type");
        return ["Invalid reference type"];
      }

      return Cite(value).format("bibliography", {
        template: format,
        format: "text",
        lang: "en-US",
      })
    }
    catch (e) {
      console.error(e)
    }
  };

  return (
    <Dialog className="citations-dialog" {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Preview the supported input and output formats</Dialog.Title>
      <Dialog.Content>
        <div className="ui form citations">
          <label><h4>Input Type</h4></label>
          <select id="inputType"
            name="inputType"
            value={inputType}
            onChange={onChangeInputType}
          >
            <option value="BibTeX">BibTeX</option>
            <option value="BibJSON">BibJSON</option>
            <option value="CSL-JSON">CSL-JSON</option>
            <option value="RIS">RIS</option>
          </select>
          <div className="scrollable">
            <pre>
              {input}
            </pre>
          </div>
          <label style={{marginTop: "1rem"}}><h4>Format</h4></label>
          <select
            id="format"
            name="format"
            value={format}
            onChange={onChangeFormat}
          >
            <option value="apa">APA</option>
            <option value="vancouver">Vancouver</option>
            <option value="harvard1">Harvard</option>
          </select>
        </div>
        <div class="citations-preview">
          <h3>Preview</h3>
          <span>{generateReference(input)}</span>
        </div>
      </Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default CitationsPreview;
