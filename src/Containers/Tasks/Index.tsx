import React from 'react'
import { useSelector } from 'react-redux'
import { TaskState } from '@/Store/Tasks'

import { TaskList } from '@/Components'
import {
  scheduleNotification,
  cancelNotifications,
} from '@/Services/Notification/sendLocalNotification'
import { TaskItem } from '@/Components/TaskType'
import PushNotification from 'react-native-push-notification'
import { Config } from '@/Config'
import moment from 'moment'

const Tasks = () => {
  const taskList: TaskItem[] = useSelector(
    // @ts-ignore
    (state: { tasks: TaskState }) => state.tasks.present.TaskList,
  )

  PushNotification.getScheduledLocalNotifications(notifications => {
    notifications.forEach(notification => {
      console.log(
        `notification: ${notification.title} for ${notification.date}`,
      )
    })
  })

  if (taskList.length === 0) {
    PushNotification.getScheduledLocalNotifications(notifications => {
      if (notifications.length !== 0) {
        console.log('cancelling all notifications')
        cancelNotifications()
      }
    })
  } else {
    const sortedList = [...taskList].sort((first, second) => {
      const f = new Date(first.nextDue).getTime()
      const s = new Date(second.nextDue).getTime()
      return f - s
    })
    // get next due
    let nextDue = new Date(sortedList[0].nextDue)
    const withTime = moment(nextDue).subtract(
      Config.DAYS_BEFORE_NOTIFICATION,
      'days',
    )

    // console.log(`next due ${nextDue}, with time: ${withTime.toDate()}`)

    if (withTime > moment()) {
      // console.log('setting due date to with time')
      nextDue = new Date(withTime.toDate())
    }

    // check if notification already exits
    PushNotification.getScheduledLocalNotifications(notifications => {
      // no active notifications, create one
      if (notifications.length === 0) {
        console.log(`creating notification for ${nextDue.toDateString()}`)
        scheduleNotification(nextDue)
        return
      }

      // not the same date, remove all and create new notification
      if (
        notifications[0].date.getDay() !== nextDue.getDay() ||
        notifications[0].date.getMonth() !== nextDue.getMonth() ||
        notifications[0].date.getFullYear() !== nextDue.getFullYear()
      ) {
        console.log('not the same notification date, removing all')
        cancelNotifications()
        console.log(`creating notification for ${nextDue.toDateString()}`)
        scheduleNotification(nextDue)
        return
      }
    })
  }

  return <TaskList tasks={taskList} />
}

export default Tasks
