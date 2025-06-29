import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea
} from '@chakra-ui/react'
import StarRating from '../Common/StarRating'

export default function ReviewEditModal({
  isOpen,
  onClose,
  review,
  editComment,
  setEditComment,
  editRating,
  setEditRating,
  onSubmit
}) {
  if (!review) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg='#191933' color='white'>
        <ModalHeader>Editar review</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color='white'>Comentario</FormLabel>
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                color='brand.200'
                _placeholder={{ color: 'green.300', opacity: 1 }}
                minH='80px'
                required
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel color='white'>Puntuación</FormLabel>
              <StarRating
                value={editRating}
                onChange={setEditRating}
                max={10}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg='#8224e3'
              color='#fff'
              _hover={{ bg: '#6313a3' }}
              type='submit'
              ml={3}
            >
              Guardar cambios
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
