import moment, { DurationInputArg2 } from 'moment'

export const TITLE_CHAR_LIMIT = 24

export interface TaskItem {
  title: string
  startDate: Date | string
  nextDue: Date | string
  lastCompleted?: Date | string | null
  repeatTimeInterval: TimeInterval
  repeatNum: number
}

export enum TimeInterval {
  Days = 'Days',
  Months = 'Months',
  Years = 'Years',
}

export const computeNextDueDate = (task: TaskItem): Date | string => {
  let durationStr: DurationInputArg2 = 'days'

  switch (task.repeatTimeInterval) {
    case TimeInterval.Months:
      durationStr = 'months'
      break
    case TimeInterval.Years:
      durationStr = 'years'
      break
  }

  const duration = moment.duration(task.repeatNum, durationStr)

  if (task.lastCompleted) {
    return moment(new Date(task.lastCompleted))
      .add(duration)
      .toDate()
      .toDateString()
  } else {
    return moment(new Date(task.startDate))
      .add(duration)
      .toDate()
      .toDateString()
  }
}

export const makeTaskItem = (
  title: string,
  startDate: Date | string,
  repeatTimeInterval: TimeInterval,
  repeatNum: number,
): TaskItem => {
  let newItem: TaskItem = {
    title,
    startDate,
    repeatTimeInterval,
    repeatNum,
    nextDue: new Date().toDateString(),
  }

  newItem.nextDue = computeNextDueDate(newItem)

  return newItem
}

export function isNumeric(str: any): boolean {
  if (typeof str != 'string') {
    return false
  } // we only process strings!
  return (
    !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

export function countSameName(
  name: string,
  ignoreIdx: number,
  tasks: TaskItem[],
): number {
  let count = 0

  tasks.forEach((item, itemIdx) => {
    if (name === item.title && itemIdx !== ignoreIdx) {
      count++
    }
  })

  return count
}
