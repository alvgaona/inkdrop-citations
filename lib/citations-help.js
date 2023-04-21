'use babel';

import React, { useEffect, useCallback } from 'react'
import { useModal } from 'inkdrop'

const CitationsHelp = () => {
  const modal = useModal()
  const { Dialog } = inkdrop.components.classes

  const help = useCallback(() => {
    modal.show()
  }, [])

  useEffect(() => {
    const sub = inkdrop.commands.add(document.body, {
      'citations:help': help
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
          There are a couple different ways to interact with this plugin:
          <br/>
          <ul>
            <li>
              Add a complete citation database or a single entry.
            </li>
            <li>
              Preview all of the supported formats.
            </li>
          </ul>
        </span>
        <h2>Issues</h2>
        <span>
          If you're experiencing issues with this plugin, 
          please add an issue in this Github repository:
          {" "}
          <a href="https://github.com/alvgaona/inkdrop-citations">
            https://github.com/alvgaona/inkdrop-citations.
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

export default CitationsHelp
