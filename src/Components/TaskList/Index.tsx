import React from 'react'
import {
  Box,
  IconButton,
  Checkbox,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
} from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Footer from '@/Components/Footer/Index'
import { TaskItem } from '@/Components/TaskType'
import { Pressable } from 'react-native'
import moment from 'moment'

const appendTask = (item: TaskItem, itemI: number) => {
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
          icon={<Icon as={FontAwesome} name="check-circle" />}
        />

        <VStack>
          <Pressable onPress={() => console.log(`item: ${item.title} pressed`)}>
            <Text fontSize="xl">{item.title}</Text>
            <Text
              fontSize="xs"
              color="emerald.800"
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
  console.log(props.tasks)

  return (
    <Center flex={1}>
      <VStack space={4} flex={1} w="90%" mt={4}>
        <Heading color="emerald.400">Dont' Forget</Heading>
        <VStack>
          {props.tasks.map((item, itemI) => appendTask(item, itemI))}
        </VStack>
      </VStack>
      <Footer />
    </Center>
  )
}

export default TaskList
