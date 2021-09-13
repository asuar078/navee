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
import { makeTaskItem, TaskItem, TimeInterval } from '@/Components/TaskType'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import ErrorAlert from '@/Components/Alert/ErrorAlert'

export interface TaskModalProps {
  showModal: boolean
  onSave: (item: TaskItem) => void
  onClose: () => void
}

function isNumeric(str: any): boolean {
  if (typeof str != 'string') {
    return false
  } // we only process strings!
  return (
    !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

const NewTaskModal = (props: TaskModalProps) => {
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
    setTaskName('')
    setTimeInterval(TimeInterval.Days)
    setRepeat('1')
  }, [props.showModal])

  const closeErrorAlert = () => {
    setErrorAlert({
      ...errorAlert,
      show: false,
    })
  }

  const calenderDatePicker = () => {
    console.log(`show date picker: ${showDatePicker}`)
    if (showDatePicker) {
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          minimumDate={new Date(Date.now())}
          onChange={(event: Event, selectedDate?: Date) => {
            console.log(`calender event: ${event.type}`)
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
          <Modal.Header>Create New Task</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Stack space={4} px={4} safeArea mt={6}>
                <ErrorAlert
                  body={errorAlert.body}
                  show={errorAlert.show}
                  onClose={closeErrorAlert}
                />
                <FormControl.Label>Enter task name</FormControl.Label>
                <Input
                  placeholder="Task Name"
                  value={taskName}
                  onChangeText={(event: any) => {
                    // console.log(event)
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
                      console.log(`changing to ${event}`)
                      const isNum = isNumeric(event) || event === ''
                      console.log(`received: ${event}, isNum: ${isNum}`)
                      if (isNum) {
                        setRepeat(event)
                      }
                    }}
                  />
                  <Select
                    selectedValue={timeInterval.toString()}
                    minWidth={200}
                    accessibilityLabel="Select your favorite programming language"
                    placeholder="Select your favorite programming language"
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

                <FormControl.Label>Enter start date</FormControl.Label>
                <Button
                  startIcon={<Icon as={FontAwesome} name="calendar" size={5} />}
                  colorScheme="emerald"
                  onPress={() => {
                    console.log('enter date pressed')
                    setShowDatePicker(true)
                  }}
                >
                  {moment(date).format('MMM DD, YYYY')}
                </Button>
                {calenderDatePicker()}
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

                  props.onSave(
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

export default NewTaskModal
