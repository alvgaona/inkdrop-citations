'use babel';

import React, { useEffect, useCallback, useState } from 'react';
import { useModal, actions } from 'inkdrop';
import  Cite  from 'citation-js';

const CitationsAppend = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const [reference, setReference] = useState("");
  const [format, setFormat] = useState("");

  const onChangeReference = (event) => {
    setReference(event.target.value);
  };

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };

  const append = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:append': append
    })
    return () => sub.dispose()
  }, [append])

  const appendReferences = () => {
    const { editingNote } = inkdrop.store.getState()

    let currentBody = editingNote?.body

    const references = generateReference(reference, format).join("\n\n")

    const re = /## References/;

    if (currentBody.match(re) == null) {
      currentBody += `\n\n## References\n\n${references}`
    } else {
      currentBody += `\n\n${references}`
    }

    inkdrop.store.dispatch(
      actions.editingNote.update(
        { 
          body: currentBody
        }
      )
    )
    inkdrop.store.dispatch(actions.editor.change(true))
  }

  const generateReference = (value, fmt = "apa") => {
    try {
      const citationsType = Cite.plugins.input.type(value);

      if (citationsType === "@invalid") {
        console.error("Invalid reference type");
        return ["Invalid reference type"];
      }

      return Cite(value).format("bibliography", {
        template: fmt,
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
      <Dialog.Title><span className="citations-title">Append references</span></Dialog.Title>
      <Dialog.Content>
      <div className="ui form citations">
          <label><h4>Input</h4></label>
          <textarea
            id="reference"
            name="reference"
            value={reference}
            onChange={onChangeReference}
            className="append-input"
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
        <button className="ui button" onClick={appendReferences}>Insert</button>
      </Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default CitationsAppend;
