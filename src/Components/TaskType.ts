import moment, { DurationInputArg2 } from 'moment'

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
