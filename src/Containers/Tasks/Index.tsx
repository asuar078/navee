import React from 'react'
import { useSelector } from 'react-redux'
import { TaskState } from '@/Store/Tasks'

import { TaskList } from '@/Components'

const Tasks = () => {
  const taskList = useSelector(
    (state: { tasks: TaskState }) => state.tasks.TaskList,
  )
  return <TaskList tasks={taskList} />
}

export default Tasks
