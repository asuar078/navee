import React, { useState } from 'react'
import {
  IconButton,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  Divider,
  useToast,
  ScrollView,
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Footer from '@/Components/Footer/Footer'
import { TaskItem } from '@/Components/TaskType'
import { Pressable } from 'react-native'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import CompleteTask from '@/Store/Tasks/CompleteTask'
import EditTask from '@/Store/Tasks/EditTask'
import TaskDetailModal from '@/Components/Model/TaskDetails'
import EditTaskModal from '@/Components/Model/EditTask'

interface TaskCallBacks {
  detailCallback: (item: TaskItem) => void
  editCallBack: (item: TaskItem) => void
}

const AppendTask = (item: TaskItem, itemI: number, callback: TaskCallBacks) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const dueColor = () => {
    const nextDue = moment(new Date(item.nextDue))
    const today = moment(Date.now())
    const timeLeft = nextDue.diff(today, 'days')
    if (timeLeft <= 1) {
      return 'rose.700'
    }
    if (timeLeft <= 7) {
      return 'orange.400'
    } else {
    }
    return 'emerald.800'
  }

  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      key={item.title + itemI.toString()}
    >
      <HStack alignItems="center" space={4}>
        <IconButton
          size="sm"
          colorScheme="emerald"
          onPress={() => {
            // @ts-ignore
            dispatch(CompleteTask.action(item))
            toast.show({
              title: 'Congratulations!',
              status: 'success',
              description: 'You have completed your task',
              placement: 'bottom',
            })
          }}
          icon={<Icon as={FontAwesome} name="check-circle" />}
        />

        <VStack>
          <Pressable
            onPress={() => {
              console.log(`item: ${item.title} pressed`)
              callback.detailCallback(item)
            }}
          >
            <Text fontSize="xl">{item.title}</Text>
            <Text
              fontSize="xs"
              color={dueColor()}
              italic={true}
            >{`Due: ${moment(new Date(item.nextDue)).format(
              'MMM DD, YYYY',
            )}`}</Text>
          </Pressable>
        </VStack>
      </HStack>

      <IconButton
        colorScheme="emerald"
        icon={<Icon as={FontAwesome} name="pencil" />}
        onPress={() => {
          callback.editCallBack(item)
        }}
      />
    </HStack>
  )
}

interface TaskListProps {
  tasks: TaskItem[]
}

const TaskList = (props: TaskListProps) => {
  const dispatch = useDispatch()

  const [detailModal, setDetailModal] = useState<{
    show: boolean
    task: TaskItem | undefined
  }>({
    show: false,
    task: undefined,
  })
  const [editModal, setEditModal] = useState<{
    show: boolean
    taskIdx: number
  }>({
    show: false,
    taskIdx: 0,
  })

  const closeDetailModal = () => {
    setDetailModal({
      ...detailModal,
      show: false,
    })
  }

  const showDetailModal = (item: TaskItem) => {
    setDetailModal({
      ...detailModal,
      show: true,
      task: item,
    })
  }

  const closeEditModal = () => {
    setEditModal({
      ...editModal,
      show: false,
    })
  }

  const showEditModal = (item: TaskItem) => {
    const idx = props.tasks.findIndex(val => val.title === item.title)

    setEditModal({
      ...editModal,
      show: true,
      taskIdx: idx,
    })
  }

  const sortedList = [...props.tasks].sort((first, second) => {
    const f = new Date(first.nextDue).getTime()
    const s = new Date(second.nextDue).getTime()
    return f - s
  })

  let dueSoon = sortedList.filter(item => {
    const nextDue = moment(new Date(item.nextDue))
    const today = moment(Date.now())
    const timeLeft = nextDue.diff(today, 'days')
    return timeLeft <= 7
  })

  let upcoming = sortedList.filter(item => {
    const nextDue = moment(new Date(item.nextDue))
    const today = moment(Date.now())
    const timeLeft = nextDue.diff(today, 'days')
    return timeLeft > 7
  })

  // console.log(dueSoon)
  // console.log(sortedList)
  return (
    <Center flex={1}>
      <ScrollView flex={1} w="95%">
        <VStack space={4} flex={1} w="95%" mt={4}>
          <Heading color="emerald.400">Don't Forget</Heading>
          <VStack>
            {dueSoon.map((item, itemI) =>
              AppendTask(item, itemI, {
                detailCallback: showDetailModal,
                editCallBack: showEditModal,
              }),
            )}
          </VStack>
          <Divider />
          <Heading color="emerald.400">Upcoming</Heading>
          <VStack>
            {upcoming.map((item, itemI) =>
              AppendTask(item, itemI, {
                detailCallback: showDetailModal,
                editCallBack: showEditModal,
              }),
            )}
          </VStack>
        </VStack>
      </ScrollView>
      <Footer tasks={props.tasks} />
      <TaskDetailModal
        showModal={detailModal.show}
        task={detailModal.task}
        onClose={closeDetailModal}
      />
      <EditTaskModal
        showModal={editModal.show}
        onSave={(idx: number, item: TaskItem) => {
          console.log(`on save for ${idx} ${item.title}`)
          closeEditModal()
          dispatch(
            EditTask.action({
              idx: idx,
              newTask: item,
            }),
          )
        }}
        onDelete={(idx: number) => {
          console.log(`on delete for ${idx} ${props.tasks[idx].title}`)
        }}
        onClose={closeEditModal}
        tasks={props.tasks}
        taskIdx={editModal.taskIdx}
      />
    </Center>
  )
}

export default TaskList
