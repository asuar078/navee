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
import TaskDetailModal from '@/Components/Model/TaskDetails'

interface TaskCallBacks {
  detailCallback: (item: TaskItem) => void
}

const appendTask = (item: TaskItem, itemI: number, callback: TaskCallBacks) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const dueColor = () => {
    const nextDue = moment(new Date(item.nextDue))
    const today = moment(Date.now())
    const timeLeft = nextDue.diff(today, 'days')
    if (timeLeft <= 1) {
      return 'rose.700'
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
        // onPress={() => handleDelete(itemI)}
      />
    </HStack>
  )
}

interface TaskListProps {
  tasks: TaskItem[]
}

const TaskList = (props: TaskListProps) => {
  const [detailModal, setDetailModal] = useState<{
    show: boolean
    task: TaskItem | undefined
  }>({
    show: false,
    task: undefined,
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
      <ScrollView flex={1} w="92%">
        <VStack space={4} flex={1} w="92%" mt={4}>
          <Heading color="emerald.400">Don't Forget</Heading>
          <VStack>
            {dueSoon.map((item, itemI) =>
              appendTask(item, itemI, { detailCallback: showDetailModal }),
            )}
          </VStack>
          <Divider />
          <Heading color="emerald.400">Upcoming</Heading>
          <VStack>
            {upcoming.map((item, itemI) =>
              appendTask(item, itemI, { detailCallback: showDetailModal }),
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
    </Center>
  )
}

export default TaskList
