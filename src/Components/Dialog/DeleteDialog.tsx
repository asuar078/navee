import React from 'react'
import { AlertDialog, Button, Center } from 'native-base'

interface DeleteDialogProps {
  header: string
  body: string
  show: boolean
  onDelete: () => void
  onClose: () => void
}

const DeleteDialog = (props: DeleteDialogProps) => {
  const cancelRef = React.useRef()
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={props.show}
        onClose={() => props.onClose()}
        motionPreset={'fade'}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            {props.header}
          </AlertDialog.Header>
          <AlertDialog.Body>{props.body}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={() => props.onClose()}>
              Cancel
            </Button>
            <Button colorScheme="red" onPress={() => props.onDelete()} ml={3}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default DeleteDialog
