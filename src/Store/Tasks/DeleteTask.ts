import { createAction } from '@reduxjs/toolkit'
import { TaskItem } from '@/Components/TaskType'
import { TaskState } from '@/Store/Tasks'

interface PayloadInterface {
  payload: Partial<TaskItem>
}

export default {
  initialState: {},
  action: createAction<Partial<TaskState>>('task/delete'),
  reducers(state: TaskState, { payload }: PayloadInterface) {
    state.TaskList.filter(
      (task: { title: string }) => task.title !== payload.title,
    )
  },
}
