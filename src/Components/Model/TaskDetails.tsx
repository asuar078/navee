import React from 'react'
import { Button, Modal, FormControl, Stack, Text } from 'native-base'
import { TaskItem } from '@/Components/TaskType'
import moment from 'moment'

export interface TaskDetailModalProps {
  showModal: boolean
  task: TaskItem | undefined
  onClose: () => void
}

const TaskDetailModal = (props: TaskDetailModalProps) => {
  if (!props.task) {
    return <></>
  }

  const showDate = (date: string | Date | null | undefined): string => {
    if (date) {
      return moment(new Date(date)).format('MMM DD, YYYY')
    } else {
      return ''
    }
  }

  return (
    <>
      <Modal isOpen={props.showModal} onClose={() => props.onClose()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Task Details</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Stack space={3} px={4} safeArea mt={6}>
                <Text fontSize="lg">
                  <Text fontSize="lg" bold>
                    Task name:
                  </Text>{' '}
                  {`${props.task.title}`}
                </Text>

                <Text fontSize="lg">
                  <Text fontSize="lg" bold>
                    Repeats every:
                  </Text>{' '}
                  {`${
                    props.task.repeatNum
                  } ${props.task.repeatTimeInterval.valueOf()}`}
                </Text>

                <Text fontSize="lg">
                  <Text fontSize="lg" bold>
                    Next due on:
                  </Text>{' '}
                  {`${showDate(props.task.nextDue)}`}
                </Text>

                <Text fontSize="lg">
                  <Text fontSize="lg" bold>
                    Last completed on:
                  </Text>{' '}
                  {`${showDate(props.task.lastCompleted)}`}
                </Text>

                <Text fontSize="lg">
                  <Text fontSize="lg" bold>
                    Started on:
                  </Text>{' '}
                  {`${showDate(props.task.startDate)}`}
                </Text>
              </Stack>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  props.onClose()
                }}
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default TaskDetailModal
