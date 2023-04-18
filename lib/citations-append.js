'use babel';

import React, { useEffect, useCallback } from 'react';
import { useModal } from 'inkdrop';

const CitationsAppend = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const append = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:append': append
    })
    return () => sub.dispose()
  }, [append])

  const c = () => {
    const { editingNote } = inkdrop.store.getState()

    console.log(editingNote?.body)
  }

  const { editingNote } = inkdrop.store.getState()

  return (
    <Dialog className="citations-dialog" {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Append references</Dialog.Title>
      <Dialog.Content>
        <div className="citations-view">
        </div>
        <button onClick={appendReference}>Insert</button>
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
