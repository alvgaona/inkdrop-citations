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
    const citationsType = Cite.plugins.input.type(value);

    if (citationsType === "@invalid") {
      console.error("Invalid reference type");
      return;
    }

    return new Cite(value).format("bibliography", {
      template: format,
      format: "text"
    });
  };


  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>View our supported citation formats!</Dialog.Title>
      <Dialog.Content>
        <div>
          <label>Name:</label>
          <textarea
            id="reference"
            name="reference"
            value={reference}
            onChange={onChangeReference}
          />
          <label>Format:</label>
          <select
            id="format"
            name="format"
            value={format}
            onChange={onChangeFormat}
          >
            <option value="apa">APA</option>
            <option value="vancouver">Vancouver</option>
            <option value="harvard">Harvard</option>
          </select>
        </div>
        <div>
          <h3>Preview</h3>
          <p>{generateReference(reference)}</p>
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
