import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { TaskItem, computeNextDueDate } from '@/Components/TaskType'
import { TaskState } from '@/Store/Tasks'

// interface PayloadInterface {
//   payload: TaskItem
// }

export default {
  initialState: {},
  action: createAction<PayloadAction<TaskItem>>('task/complete'),
  reducers(state: TaskState, { payload }: PayloadAction<TaskItem>) {
    const idx = state.TaskList.findIndex(item => item.title === payload.title)
    if (idx < 0) {
      return
    }

    state.TaskList[idx].lastCompleted = new Date(Date.now()).toDateString()
    state.TaskList[idx].nextDue = computeNextDueDate(state.TaskList[idx])
    console.log(state.TaskList[idx])
  },
}
