'use babel';

import CitationsHelp from './citations-help';
import CitationsPreview from './citations-preview';
import CitationsAppend from './citations-append';

export function activate() {
  inkdrop.components.registerClass(CitationsHelp);
  inkdrop.components.registerClass(CitationsPreview);
  inkdrop.components.registerClass(CitationsAppend);

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
    'CitationsAppend',
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
    'CitationsAppend',
  )
  
  inkdrop.components.deleteClass(CitationsHelp);
  inkdrop.components.deleteClass(CitationsPreview);
  inkdrop.components.deleteClass(CitationsAppend);
}

