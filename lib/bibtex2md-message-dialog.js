'use babel';

import React, { useEffect, useCallback } from 'react'
import { logger, useModal } from 'inkdrop'

const Bibtex2mdMessageDialog = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const help = useCallback(() => {
    modal.show()
    logger.debug('User asked for help')
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'bibtex2md:help': help
    })
    return () => sub.dispose()
  }, [help])

  return (
    <Dialog {...modal.state} onBackdropClick={modal.close}>
      <Dialog.Title>Don't worry. We're here to help you! 😁</Dialog.Title>
      <Dialog.Content>
        <h2>Introduction</h2>
        <span>
          One of the most annoying things about adding references at the end of your document is
          formatting them according to a standard, e.g., APA, Vancouver, etc.
          <br/>
          This plugin was created to easily add bibliography or references into your Markdown file.
        </span>

        <h2>Usage</h2>
        <span>
          There are a few different ways to interact with this plugin:
          <br/>
          <ul>
            <li>
              Add a complete bibtex file.
            </li>
            <li>
              Append a single reference.
            </li>
            <li>
              View all of the supported formats.
            </li>
          </ul>
        </span>
        <h2>Issues</h2>
        <span>
          If you're experiencing issues with this plugin, 
          please add an issue in this Github repository:
          {" "}
          <a href="https://github.com/alvgaona/inkdrop-bibtex2md">
            https://github.com/alvgaona/inkdrop-bibtex2md.
          </a>
        </span>
      </Dialog.Content>
      <Dialog.Actions>
        <button className="ui button" onClick={modal.close}>
          Close
        </button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default Bibtex2mdMessageDialog
