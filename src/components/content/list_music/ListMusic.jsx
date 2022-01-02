import React, { Fragment } from 'react';
import ListMusicItem from './ListMusicItem';

const ListMusic = ({ musics }) => {
    return (
        <Fragment>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>15 آهنگ برتر هفته</h1>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 padding_right40">

                            {musics.map((music, index) => (
                                <ListMusicItem
                                    key={music.id}
                                    music={music}
                                    index={index}
                    
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ListMusic;