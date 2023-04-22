'use babel';

import { useEffect, useCallback, useState } from 'react';
import { renumberCites } from './helpers';

const CitationsRenumber = () => {
  global.inkdrop.onEditorLoad(editor => { setEditor(editor) })

  const [editor, setEditor] = useState(null)

  const renumber = useCallback(() => {
    renumberCites(editor)
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:renumber': renumber
    })
    return () => sub.dispose()
  }, [renumber])

  return <></>
}

export default CitationsRenumber;
