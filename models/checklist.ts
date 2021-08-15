// This import is possible due to js-yaml-loader configured in webpack.
// @ts-ignore
import doc from '../data/checklist.ptbr.yml';

export class ChecklistModel {
  constructor() {
  }

  checklist(): string[] {
    return doc.checklist;
  }
}
