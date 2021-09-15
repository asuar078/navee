import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import undoable, { includeAction } from 'redux-undo'
import { TaskItem } from '@/Components/TaskType'
import AddTask from './AddTask'
import DeleteTask from './DeleteTask'
import CompleteTask from './CompleteTask'
import EditTask from './EditTask'

const taskReducer = buildSlice(
  'tasks',
  [AddTask, DeleteTask, CompleteTask, EditTask],
  {
    TaskList: [],
  },
).reducer

export interface TaskState {
  TaskList: TaskItem[]
}

export default undoable(taskReducer, { limit: 5 })
