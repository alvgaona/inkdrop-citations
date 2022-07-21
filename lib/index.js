'use babel';

import CitationsHelp from './citations-help';
import CitationsView from './citations-view';

export function activate() {
  inkdrop.components.registerClass(CitationsHelp);
  inkdrop.components.registerClass(CitationsView);
  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsHelp',
  )

  inkdrop.layouts.addComponentToLayout(
    'modal',
    'CitationsView',
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
  
  
  inkdrop.components.deleteClass(CitationsHelp);
  inkdrop.components.deleteClass(CitationsView);
}

