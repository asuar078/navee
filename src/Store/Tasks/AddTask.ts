import { createAction } from '@reduxjs/toolkit'
import { TaskItem } from '@/Components/TaskType'
import { TaskState } from '@/Store/Tasks'

interface PayloadInterface {
  payload: TaskItem
}

export default {
  initialState: {},
  action: createAction<PayloadInterface>('task/add'),
  reducers(state: TaskState, { payload }: PayloadInterface) {
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
