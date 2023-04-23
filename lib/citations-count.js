'use babel';

import { useEffect, useCallback, useState } from 'react';
import { countReferences, countCites } from './helpers';
import { useModal } from 'inkdrop'

const CitationsCount = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes
  const [refCount, setRefCount] = useState(0)
  const [citeCount, setCiteCount] = useState(0)

  const count = useCallback(() => {
    const { editingNote } = inkdrop.store.getState()
    setRefCount(countReferences(editingNote?.body))
    setCiteCount(countCites(editingNote?.body))
    
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:count': count
    })
    return () => sub.dispose()
  }, [count])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Citation Count</Dialog.Title>
      <Dialog.Content>
        <div className="ui citations">
          <span>Reference count: {refCount}</span>
          <span>Cite count: {citeCount}</span>
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

export default CitationsCount;
