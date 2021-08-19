// This import is possible due to js-yaml-loader configured in webpack.
// @ts-ignore
import doc from '../data/checklist.ptbr.yml';

export class ChecklistModel {
  taskId = (id) => `task-${id}`

  constructor(list: string) {
  }

  static all(): string[] {
    return doc.checklist;
  }

  check(id: string, value: boolean) {
    window.localStorage.setItem(this.taskId(id), `${value}`)
  }

  isChecked(id: string): boolean {
    return window.localStorage.getItem(this.taskId(id)) == "true"
  }
}
