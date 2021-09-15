import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { TaskItem } from '@/Components/TaskType'
import { TaskState } from '@/Store/Tasks'

export default {
  initialState: {},
  action: createAction<PayloadAction<TaskItem>>('task/add'),
  reducers(state: TaskState, { payload }: PayloadAction<TaskItem>) {
    console.log(payload)
    if (!payload.title) {
      return
    }

    const alreadyExits = state.TaskList.find(
      item => item.title === payload.title,
    )
    if (alreadyExits) {
      return
    }

    state.TaskList = [...state.TaskList, payload]
  },
}
