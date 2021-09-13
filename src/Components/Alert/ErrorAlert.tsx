import React from 'react'
import { Alert, Collapse, IconButton, CloseIcon } from 'native-base'

export interface ErrorAlertProps {
  body: string
  show: boolean
  onClose: () => void
}

const ErrorAlert = (props: ErrorAlertProps) => {
  return (
    <Collapse isOpen={props.show}>
      <Alert
        status="error"
        action={
          <IconButton
            icon={<CloseIcon size="xs" />}
            onPress={() => props.onClose()}
          />
        }
        // actionProps={{
        //   alignSelf: 'center',
        // }}
      >
        <Alert.Icon />
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>{props.body}</Alert.Description>
      </Alert>
    </Collapse>
  )
}

export default ErrorAlert

// export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1}>
//         <Example />
//       </Center>
//     </NativeBaseProvider>
//   )
// }
