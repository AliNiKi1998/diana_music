import React, { Fragment } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import DianaSliderItem from './DianaSliderItem';

SwiperCore.use([Navigation]);


const DianaSlider = ({ allSinger }) => {
    return (

        <Fragment>
            <div className="ms_releases_wrapper">
                <div className="ms_heading">
                    <h1>خواننده ها</h1>
                </div>
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    slidesPerView={4}
                    loop={true}
                    breakpoints={{
                        "0": {
                            "slidesPerView": 1,
                        },
                        "400": {
                            "slidesPerView": 2,
                        },
                        "640": {
                            "slidesPerView": 3,
                        },
                        "920": {
                            "slidesPerView": 4,
                        }
                    }}
                >

                    {allSinger.map(singer => (
                        <SwiperSlide
                            key={singer.id}
                        >
                            <DianaSliderItem 
                                image={singer.image}
                                singerName={singer.name}
                                musics={singer.count}
                                id={singer.id}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Fragment>


    );
}

export default DianaSlider;