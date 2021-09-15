import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { TaskState } from '@/Store/Tasks'

export default {
  initialState: {},
  action: createAction<PayloadAction<number>>('task/delete'),
  reducers(state: TaskState, { payload }: PayloadAction<number>) {
    // state.TaskList.filter(
    //   (task: { title: string }) => task.title !== payload.title,
    // )
    state.TaskList.splice(payload, 1)
  },
}
