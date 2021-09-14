import React from 'react'
import { AlertDialog, Button, Center } from 'native-base'

export interface ErrorDialogProps {
  header: string
  body: string
  show: boolean
  onClose: () => void
}

const ErrorDialog = (props: ErrorDialogProps) => {
  const cancelRef = React.useRef()

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={props.show}
        onClose={() => props.onClose()}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>{props.header}</AlertDialog.Header>
          <AlertDialog.Body>{props.body}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={() => props.onClose()}>
              Close
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default ErrorDialog
