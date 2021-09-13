import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import { TaskItem } from '@/Components/TaskType'
import AddTask from './AddTask'
import DeleteTask from './DeleteTask'

export default buildSlice('tasks', [AddTask, DeleteTask], {
  TaskList: [],
}).reducer

export interface TaskState {
  TaskList: TaskItem[]
}
