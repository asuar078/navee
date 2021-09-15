import { createAction, PayloadAction } from '@reduxjs/toolkit'
import { computeNextDueDate, TaskItem } from '@/Components/TaskType'
import { TaskState } from '@/Store/Tasks'

export default {
  initialState: {},
  action: createAction<PayloadAction<{ idx: number; newTask: TaskItem }>>(
    'task/edit',
  ),
  reducers(
    state: TaskState,
    { payload }: PayloadAction<{ idx: number; newTask: TaskItem }>,
  ) {
    // console.log('edit task for')
    // console.log(payload)

    state.TaskList[payload.idx].title = payload.newTask.title

    let refDate = new Date().toDateString()
    if (state.TaskList[payload.idx].lastCompleted) {
      refDate = state.TaskList[payload.idx].lastCompleted
    } else {
      refDate = state.TaskList[payload.idx].startDate
    }

    // if changing repeat interval or start date compute new due date
    if (
      state.TaskList[payload.idx].repeatNum !== payload.newTask.repeatNum ||
      state.TaskList[payload.idx].repeatTimeInterval !==
        payload.newTask.repeatTimeInterval ||
      refDate !== payload.newTask.startDate
    ) {
      // console.log('computing new due date')

      state.TaskList[payload.idx].repeatNum = payload.newTask.repeatNum
      state.TaskList[payload.idx].repeatTimeInterval =
        payload.newTask.repeatTimeInterval

      if (state.TaskList[payload.idx].lastCompleted) {
        state.TaskList[payload.idx].lastCompleted = payload.newTask.startDate
      } else {
        state.TaskList[payload.idx].startDate = payload.newTask.startDate
      }

      state.TaskList[payload.idx].nextDue = computeNextDueDate(
        state.TaskList[payload.idx],
      )
    }

    // console.log(state.TaskList[payload.idx])
  },
}
