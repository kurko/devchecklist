// This import is possible due to js-yaml-loader configured in webpack.
// @ts-ignore
import doc from '../data/checklist.ptbr.yml';

export class ChecklistModel {
  taskId = (id) => `task-${id}`
  listId = (id) => `list-${id}`
  data: any

  constructor(checklist: any) {
    this.data = checklist
  }

  static all(): string[] {
    return doc.checklist;
  }

  /**
   * Should we show a list open? If we showed all of them open, it'd be
   * unntanable for the user. It's best to hide some. The decision whether to
   * keep lists open are:
   *
   * 1. is it the first list?
   * 2. does the list has any checked tasks?
   * 3. is the previous list mostly complete?
   * 4. has the user not marked it as collapsed?
   */
  isListReadyToBeStarted(listName: string): boolean {
    const allListNames = Object.keys(this.data.lists)
    const listPosition = allListNames.indexOf(listName)
    const isFirstList = listPosition === 0
    var previousList = null
    var previousListName = null

    if (listPosition > 0) {
      previousListName = allListNames[listPosition - 1]
      previousList = this.data.lists[previousListName]
      console.log("supposed previousList", previousList)
    }

    const isPreviousListTasksComplete = previousList && this.isListAlmostComplete(previousListName)
    const listHasCheckedTasks = this.anyTaskCompleteInList(listName)

    return !this.isListCollapsed(listName) && (previousList === null || isPreviousListTasksComplete || listHasCheckedTasks)
  }

  check(id: string, value: boolean) {
    window.localStorage.setItem(this.taskId(id), `${value}`)
  }

  isChecked(id: string): boolean {
    return window.localStorage.getItem(this.taskId(id)) == "true"
  }

  /**
   * "collapse" is when a list is hidden because the user clicked on it
   */
  markListAsCollapsed(listName: string, value: boolean) {
    console.log(listName);
    window.localStorage.setItem(`${this.listId(listName)}-collapsed`, `${value}`)
  }

  isListCollapsed(listName: string): boolean {
    return window.localStorage.getItem(`${this.listId(listName)}-collapsed`) == "true"
  }

  private listTasks(listName: string): any {
    let tasks = []
    console.log("listTasks listname", listName)
    this.data.lists[listName].taskSet.forEach((set) => {
      set.tasks.forEach((task) => tasks.push(task))
    })
    return tasks
  }

  private countTasksInList(listName: string): number {
    return this.listTasks(listName).length
  }

  private isListAlmostComplete(listName: string): boolean {
    const totalTasks = this.countTasksInList(listName)
    const totalCompletedTasks = this.listTasks(listName).filter((task) => {
      return window.localStorage.getItem(this.taskId(task.id)) == "true"
    }).length

    console.log("totalCompletedTasks", totalCompletedTasks)
    return totalCompletedTasks / totalTasks > 0.8
  }

  private anyTaskCompleteInList(listName: string): boolean {
    return this.listTasks(listName).find((task) => {
      return window.localStorage.getItem(this.taskId(task.id)) == "true"
    })
  }
}
