'use babel';

import CitationsHelp from './citations-help';
import CitationsView from './citations-view';
import CitationsAppend from './citations-append';

export function activate() {
  inkdrop.components.registerClass(CitationsHelp);
  inkdrop.components.registerClass(CitationsView);
  inkdrop.components.registerClass(CitationsAppend);

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsHelp',
  )

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsView',
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
    'CitationsView',
  )
  
  inkdrop.layouts.removeComponentFromLayout(
    'modal',
    'CitationsAppend',
  )
  
  inkdrop.components.deleteClass(CitationsHelp);
  inkdrop.components.deleteClass(CitationsView);
  inkdrop.components.deleteClass(CitationsAppend);
}

