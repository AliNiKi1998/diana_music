import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Banner from './banner/Banner';
import ListMusic from './list_music/ListMusic';
import DianaSlider from './slider/dianaSlider/DianaSlider';
import ADS from './ads/ADS';
import Style from './style/Style';
//services
import { getLastMusic, getWeeklyPopularMusic } from '../../services/musicServises';
import { getSingers } from '../../services/singerServices';
//actions
import { setWeeklyPopularMusic } from '../../state_manager/actions/weeklyPopularMusic';
import { setSingers } from '../../state_manager/actions/singers';

const Index = () => {
    
    const dispatch = useDispatch();

    const [lastMusic, setLastMusic] = useState([]);
    //last music
    const handleLastMusic = async () => {
        const { data } = await getLastMusic();
        setLastMusic(data);
    }
    //weekly popular
    const handleWeeklyPopularMusic = async () => {
        await getWeeklyPopularMusic().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setWeeklyPopularMusic(data));
                }
            }
        )
    }
    //singers
    const handleGetSingers = async () => {
        await getSingers().then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setSingers(data));
                }
            }
        )
    }

    useEffect(() => {
        handleLastMusic();
        handleWeeklyPopularMusic();
        handleGetSingers();
    }, [])

    const weeklyPopularMusic = useSelector(state => state.weeklyPopularMusic);

    const singers = useSelector(state => state.singers);

    return (
        <Fragment>

            {/* banner */}
            <Banner />

             {/* singer slider */}
            <DianaSlider allSinger={singers}/>

            {/* list_music */}
            <ListMusic  musics={weeklyPopularMusic}/>

            {/* ads */}
            <ADS />

            {/* sytle */}
            <Style />

            {/* ads */}
            <ADS />

        </Fragment>
    );
}

export default Index;