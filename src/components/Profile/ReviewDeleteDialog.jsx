import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from '@chakra-ui/react'

export default function ReviewDeleteDialog({
  isOpen,
  onClose,
  onDelete,
  cancelRef
}) {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            ¿Eliminar review?
          </AlertDialogHeader>
          <AlertDialogBody>
            Esta acción no se puede deshacer. ¿Estás seguro de eliminar la
            review?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg='#d90429'
              color='#fff'
              _hover={{ bg: '#a0031c' }}
              onClick={onDelete}
              ml={3}
            >
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
