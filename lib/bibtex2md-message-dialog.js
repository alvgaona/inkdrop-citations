'use babel';

import React, { useEffect, useCallback } from 'react'
import { logger, useModal } from 'inkdrop'

const Bibtex2mdMessageDialog = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const insert = useCallback(() => {
    modal.show()
    logger.debug('About to insert bibtex!')
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'bibtex2md:insert': insert
    })
    return () => sub.dispose()
  }, [insert])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Insert your bibtex into your note!</Dialog.Title>
      <Dialog.Content>
        <textarea />
      </Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Insert
        </button>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default Bibtex2mdMessageDialog
