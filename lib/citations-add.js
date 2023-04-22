'use babel';

import React, { useEffect, useCallback, useState } from 'react';
import { useModal, actions } from 'inkdrop';
import { countReferences, generateReferences, renumberCites } from './helpers';

import { remote } from 'electron'

const app = remote.app
const modulePath = app.getAppPath() + '/node_modules/'
require(modulePath + 'codemirror/addon/search/searchcursor.js')

const CitationsAdd = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const [reference, setReference] = useState("")
  const [format, setFormat] = useState("")
  const [header, setHeader] = useState("References")
  const [editor, setEditor] = useState(null)

  global.inkdrop.onEditorLoad(editor => { setEditor(editor) })

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

  const renumber = () => {
    renumberCites(editor)
  }

  const addReferences = () => {
    const { editingNote } = inkdrop.store.getState()

    let currentBody = editingNote?.body

    const offset = countReferences(currentBody)

    let references = generateReferences(reference, format, offset, true)

    if (!references.length) {
      return
    }

    references = references.join("\n\n")

    const re = /## (References|Bibliography|Citations)/;

    if (currentBody.match(re) == null) {
      currentBody += `\n\n## ${header}\n\n${references}`
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
        <button className="ui button" onClick={renumber}>Renumber</button>
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
