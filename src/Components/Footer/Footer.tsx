import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { Text, Icon, HStack, Center, Pressable } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AddTask from '@/Store/Tasks/AddTask'

import NewTaskModal from '@/Components/Model/NewTask'
import { TaskItem } from '@/Components/TaskType'

interface FooterButtonProps {
  label: string
  iconName: string
  onClicked: () => void
}

const FooterButton = (props: FooterButtonProps) => {
  const dispatch = useDispatch()

  return (
    <Pressable
      // cursor="pointer"
      opacity={1}
      py={2}
      flex={1}
      onPress={() => props.onClicked()}
    >
      <Center>
        <Icon
          mb={1}
          as={<FontAwesome name={props.iconName} />}
          color="white"
          size="xs"
        />

        <Text color="white" fontSize={14}>
          {props.label}
        </Text>
      </Center>
    </Pressable>
  )
}

interface FooterProps {
  tasks: TaskItem[]
}

const Footer = (props: FooterProps) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  return (
    <>
      <HStack bg="emerald.500" alignItems="center" safeAreaBottom shadow={6}>
        <FooterButton
          label={'Add Task'}
          iconName={'plus'}
          onClicked={() => setShowModal(true)}
        />
        <FooterButton
          label={'Undo'}
          iconName={'undo'}
          onClicked={() => dispatch(ActionCreators.undo())}
        />
        <FooterButton
          label={'Redo'}
          iconName={'repeat'}
          onClicked={() => dispatch(ActionCreators.redo())}
        />
      </HStack>
      <NewTaskModal
        showModal={showModal}
        onSave={(item: TaskItem) => {
          // @ts-ignore
          dispatch(AddTask.action(item))
          setShowModal(false)
        }}
        onClose={() => setShowModal(false)}
        tasks={props.tasks}
      />
    </>
  )
}

export default Footer
