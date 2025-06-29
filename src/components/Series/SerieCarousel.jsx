import { Box, Heading, Flex, Spinner } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import SerieCard from './SerieCard'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function SerieCarousel({ topSeries, loading, platformLogos }) {
  return (
    <Box px={[2, 10]} mt={5}>
      <Heading color='brand.200' size='lg' mb={8}>
        Series Destacadas
      </Heading>
      {loading ? (
        <Flex align='center' justify='center' minH={300}>
          <Spinner color='brand.200' size='xl' />
        </Flex>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={28}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
          style={{ borderRadius: 16, paddingBottom: 36, minHeight: 360 }}
        >
          {topSeries.map((serie) => (
            <SwiperSlide key={serie._id}>
              <SerieCard
                serie={serie}
                platformLogo={platformLogos[serie.plataforma]}
                onClick={() => (window.location.href = `/serie/${serie._id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  )
}
