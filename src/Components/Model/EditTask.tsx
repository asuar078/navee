import React from 'react'
import {
  Button,
  Modal,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Stack,
  Icon,
  HStack,
} from 'native-base'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { useState, useEffect } from 'react'
import {
  makeTaskItem,
  TaskItem,
  TimeInterval,
  TITLE_CHAR_LIMIT,
  isNumeric,
  countSameName,
} from '@/Components/TaskType'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

import ErrorAlert from '@/Components/Alert/ErrorAlert'

export interface EditTaskModalProps {
  showModal: boolean
  onSave: (idx: number, item: TaskItem) => void
  onDelete: (idx: number) => void
  onClose: () => void
  tasks: TaskItem[]
  taskIdx: number
}

const EditTaskModal = (props: EditTaskModalProps) => {
  const [taskName, setTaskName] = useState<string>('')
  const [timeInterval, setTimeInterval] = useState<TimeInterval>(
    TimeInterval.Days,
  )
  const [repeat, setRepeat] = useState<string>('1')
  const [date, setDate] = useState<Date>(new Date(Date.now()))
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [errorAlert, setErrorAlert] = useState<{ show: boolean; body: string }>(
    {
      show: false,
      body: '',
    },
  )

  useEffect(() => {
    const taskInfo = props.tasks[props.taskIdx]
    setTaskName(taskInfo.title)
    setTimeInterval(taskInfo.repeatTimeInterval)
    setRepeat(taskInfo.repeatNum.toString())
    if (taskInfo.lastCompleted) {
      setDate(new Date(taskInfo.lastCompleted))
    } else {
      setDate(new Date(taskInfo.startDate))
    }
    setErrorAlert({
      ...errorAlert,
      show: false,
    })
  }, [props.showModal])

  const closeErrorAlert = () => {
    setErrorAlert({
      ...errorAlert,
      show: false,
    })
  }

  const calenderDatePicker = () => {
    // console.log(`show date picker: ${showDatePicker}`)
    if (showDatePicker) {
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          // minimumDate={new Date(Date.now())}
          onChange={(event: Event, selectedDate?: Date) => {
            // console.log(`calender event: ${event.type}`)
            setShowDatePicker(false)

            if (event.type === 'set') {
              const currentDate = selectedDate || date
              setDate(currentDate)
            }
          }}
        />
      )
    } else {
      return <></>
    }
  }

  return (
    <>
      <Modal isOpen={props.showModal} onClose={() => props.onClose()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Task</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Stack space={3} px={4} safeArea mt={6}>
                <ErrorAlert
                  body={errorAlert.body}
                  show={errorAlert.show}
                  onClose={closeErrorAlert}
                />
                <FormControl.Label>Change task name</FormControl.Label>
                <Input
                  placeholder="Task Name"
                  value={taskName}
                  onChangeText={(event: any) => {
                    // console.log(event)
                    if (event.length > TITLE_CHAR_LIMIT) {
                      return
                    }

                    setTaskName(event)
                  }}
                  isInvalid={taskName === ''}
                />
                <FormControl.Label>Repeat every...</FormControl.Label>
                <HStack alignItems="center">
                  <Input
                    value={repeat}
                    keyboardType="numeric"
                    onChangeText={(event: string) => {
                      const isNum = isNumeric(event) || event === ''
                      if (isNum) {
                        setRepeat(event)
                      }
                    }}
                  />
                  <Select
                    selectedValue={timeInterval.toString()}
                    minWidth={200}
                    onValueChange={itemValue => {
                      setTimeInterval(
                        TimeInterval[itemValue as keyof typeof TimeInterval],
                      )
                    }}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={4} />,
                    }}
                  >
                    <Select.Item
                      label={TimeInterval.Days.valueOf()}
                      value={TimeInterval.Days.valueOf()}
                    />
                    <Select.Item
                      label={TimeInterval.Months.valueOf()}
                      value={TimeInterval.Months.valueOf()}
                    />
                    <Select.Item
                      label={TimeInterval.Years.valueOf()}
                      value={TimeInterval.Years.valueOf()}
                    />
                  </Select>
                </HStack>

                <FormControl.Label>
                  {props.tasks[props.taskIdx].lastCompleted
                    ? 'Change last completed date'
                    : 'Change start date'}
                </FormControl.Label>

                <Button
                  startIcon={<Icon as={FontAwesome} name="calendar" size={5} />}
                  colorScheme="emerald"
                  onPress={() => {
                    // console.log('enter date pressed')
                    setShowDatePicker(true)
                  }}
                >
                  {moment(date).format('MMM DD, YYYY')}
                </Button>
                {calenderDatePicker()}
                <Button
                  startIcon={<Icon as={FontAwesome} name="trash" size={5} />}
                  colorScheme="danger"
                  _text={{
                    color: 'white',
                  }}
                  onPress={() => {
                    // console.log('enter date pressed')
                    // setShowDatePicker(true)
                  }}
                >
                  DELETE TASK
                </Button>
              </Stack>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  if (taskName === '') {
                    setErrorAlert({
                      ...errorAlert,
                      show: true,
                      body: 'Task name can not be empty',
                    })
                    return
                  }

                  if (!isNumeric(repeat)) {
                    setErrorAlert({
                      ...errorAlert,
                      show: true,
                      body: 'Repeat interval not valid',
                    })
                    return
                  }

                  const alreadyExits = countSameName(
                    taskName,
                    props.taskIdx,
                    props.tasks,
                  )
                  if (alreadyExits > 0) {
                    setErrorAlert({
                      ...errorAlert,
                      show: true,
                      body: 'Task name already exits',
                    })
                    return
                  }

                  props.onSave(
                    props.taskIdx,
                    makeTaskItem(
                      taskName,
                      date.toDateString(),
                      timeInterval,
                      Number(repeat),
                    ),
                  )
                }}
              >
                SAVE
              </Button>
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

export default EditTaskModal
