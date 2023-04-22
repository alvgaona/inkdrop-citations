'use babel'

import CitationsHelp from './citations-help'
import CitationsPreview from './citations-preview'
import CitationsAdd from './citations-add'
import CitationsRenumber from './citations-renumber'

export function activate() {
  inkdrop.components.registerClass(CitationsHelp)
  inkdrop.components.registerClass(CitationsPreview)
  inkdrop.components.registerClass(CitationsAdd)
  inkdrop.components.registerClass(CitationsRenumber)

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsHelp',
  )

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsPreview',
  )

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsAdd',
  )

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsRenumber',
  )
}

export function deactivate() {
  inkdrop.layouts.removeComponentFromLayout(
    'modal',
    'CitationsHelp',
  )

  inkdrop.layouts.removeComponentFromLayout(
    'modal',
    'CitationsPreview',
  )
  
  inkdrop.layouts.removeComponentFromLayout(
    'modal',
    'CitationsAdd',
  )

  inkdrop.layouts.removeComponentFromLayout(
    'modal',
    'CitationsRenumber',
  )
  
  inkdrop.components.deleteClass(CitationsHelp)
  inkdrop.components.deleteClass(CitationsPreview)
  inkdrop.components.deleteClass(CitationsAdd)
  inkdrop.components.deleteClass(CitationsRenumber)
}

