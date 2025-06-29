import React, { useState } from 'react'
import Slider from 'react-slick'
import styles from './Carousel.module.scss'

const IMAGES = [
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611669/pilotseries/sampleseries/series7_c4dthi.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611669/pilotseries/sampleseries/series9_swrf6k.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611669/pilotseries/sampleseries/series8_nn4fpf.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611669/pilotseries/sampleseries/series5_hiivxd.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611669/pilotseries/sampleseries/series6_c0vz9q.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611668/pilotseries/sampleseries/series10_nd7nut.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611668/pilotseries/sampleseries/series4_ysgwon.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611668/pilotseries/sampleseries/series3_na0snd.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611668/pilotseries/sampleseries/serie1_zhhfto.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750611668/pilotseries/sampleseries/serie2_yml3kt.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621080/pilotseries/sampleseries/otras20/series17_rnyoqe.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621079/pilotseries/sampleseries/otras20/series20_yornmw.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621076/pilotseries/sampleseries/otras20/series18_ctb0ol.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621075/pilotseries/sampleseries/otras20/series19_ihtjst.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621072/pilotseries/sampleseries/otras20/series21_h0byw7.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621071/pilotseries/sampleseries/otras20/series22_ozczyw.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621071/pilotseries/sampleseries/otras20/series23_iitcg6.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621068/pilotseries/sampleseries/otras20/series24_uutika.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621067/pilotseries/sampleseries/otras20/series25_naiunz.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621067/pilotseries/sampleseries/otras20/series26_keehja.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621066/pilotseries/sampleseries/otras20/series27_knf1rq.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621065/pilotseries/sampleseries/otras20/series28_k0hmlh.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621063/pilotseries/sampleseries/otras20/series29_yleuyu.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621061/pilotseries/sampleseries/otras20/series30_itmvcb.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621061/pilotseries/sampleseries/otras20/series11_nar3zt.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621061/pilotseries/sampleseries/otras20/series12_mcbtft.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621060/pilotseries/sampleseries/otras20/series13_elac4o.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621060/pilotseries/sampleseries/otras20/series15_msykri.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621060/pilotseries/sampleseries/otras20/series16_dqlhji.png',
  'https://res.cloudinary.com/dye4qdrys/image/upload/v1750621060/pilotseries/sampleseries/otras20/series14_ed1pdv.png'
]
export default function Carousel() {
  const [images] = useState(IMAGES)

  const settings = {
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 8,
    slidesToScroll: 1,
    rows: 3,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    swipe: false,
    draggable: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  }

  return (
    <div className={styles.wrapper}>
      <Slider {...settings}>
        {images.map((src, i) => (
          <div key={i} className={styles.slideContainer}>
            <img
              src={src}
              alt={`serie-${i}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
