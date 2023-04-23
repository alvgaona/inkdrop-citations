'use babel';

import React, { useEffect, useCallback, useState } from 'react';
import { useModal, actions } from 'inkdrop';
import { generateReferences } from './helpers';

const CitationsAdd = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const [reference, setReference] = useState("")
  const [format, setFormat] = useState("")
  const [header, setHeader] = useState("References")

  const onChangeReference = (event) => {
    setReference(event.target.value);
  };

  const onChangeFormat = (event) => {
    setFormat(event.target.value);
  };

  const onChangeHeader = (event) => {
    setHeader(event.target.value)
  }

  const add = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:add': add
    })
    return () => sub.dispose()
  }, [add])

  const addReferences = () => {
    const { editingNote } = inkdrop.store.getState()

    let currentBody = editingNote?.body

    let references = generateReferences(reference, format, true)

    if (!references.length) {
      return
    }

    references = references.join("\n\n")

    const re = /## (References|Bibliography|Citations)/;

    if (currentBody.match(re) == null) {
      if (currentBody == "") {
        currentBody += `## ${header}`
      } else {
        currentBody += `\n\n## ${header}`
      }
    }

    currentBody += `\n\n${references}`

    inkdrop.store.dispatch(
      actions.editingNote.update(
        { 
          body: currentBody
        }
      )
    )
    inkdrop.store.dispatch(actions.editor.change(true))
  }

  return (
    <Dialog className="citations-dialog" {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title><span className="citations-title">Add your references</span></Dialog.Title>
      <Dialog.Content>
      <div className="ui form citations">
          <label><h4>Input</h4></label>
          <textarea
            id="reference"
            name="reference"
            value={reference}
            onChange={onChangeReference}
            className="add-input"
          />
          <label style={{marginTop: "1rem"}}><h4>Header</h4></label>
          <select
            id="header"
            name="header"
            value={header}
            onChange={onChangeHeader}
          >
            <option value="References">References</option>
            <option value="Bibliography">Bibliography</option>
            <option value="Citations">Citations</option>
          </select>
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
        <button className="ui button" onClick={addReferences}>Add</button>
      </Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default CitationsAdd;
