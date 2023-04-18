'use babel';

import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from 'inkdrop';
import Cite from 'citation-js';


const CitationsView = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const view = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:view': view
    })
    return () => sub.dispose()
  }, [view])

  const [reference, setReference] = useState("");
  const [format, setFormat] = useState("");

  const onChangeReference = (event) => {
    setReference(event.target.value);
  };

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };

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
      }).split("\n")
    }
    catch (e) {
      console.error(e)
    }
  };


  return (
    <Dialog className="citations-dialog" {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Check out the available formats</Dialog.Title>
      <Dialog.Content>
        <div className="citations-view">
          <label><h4>Input</h4></label>
          <textarea
            id="reference"
            name="reference"
            value={reference}
            onChange={onChangeReference}
          />
          <label><h4>Format</h4></label>
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
          {generateReference(reference).map((reference) => <span>{reference}</span>)}
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

export default CitationsView;
