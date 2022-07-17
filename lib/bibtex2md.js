'use babel';

import Bibtex2mdMessageDialog from './bibtex2md-message-dialog';

module.exports = {

  activate() {
    inkdrop.components.registerClass(Bibtex2mdMessageDialog);
    inkdrop.layouts.addComponentToLayout(
      'modal',
      'Bibtex2mdMessageDialog'
    )
  },

  deactivate() {
    inkdrop.layouts.removeComponentFromLayout(
      'modal',
      'Bibtex2mdMessageDialog'
    )
    inkdrop.components.deleteClass(Bibtex2mdMessageDialog);
  }

};
