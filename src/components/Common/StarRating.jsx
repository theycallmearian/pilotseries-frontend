import { HStack, IconButton } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

export default function StarRating({
  value,
  onChange,
  max = 10,
  readOnly = false
}) {
  const handleClick = (i) => {
    if (!readOnly && onChange) onChange(i + 1)
  }
  return (
    <HStack wrap='wrap' spacing={0.5} maxW='full' justify='center'>
      {Array.from({ length: max }).map((_, i) => (
        <IconButton
          key={i}
          icon={<FaStar />}
          color={i < value ? 'yellow.300' : 'gray.500'}
          variant='ghost'
          size='sm'
          onClick={() => handleClick(i)}
          aria-label={`Puntuación ${i + 1}`}
          isDisabled={readOnly}
        />
      ))}
    </HStack>
  )
}
