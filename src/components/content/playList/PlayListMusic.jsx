import { Fragment, useEffect, useState } from 'react'
import PlayListMusicItem from './PlayListMusicItem';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
//services
import { getMusicOfPlayList, getPlayListInfo } from './../../../services/musicServises';
//actions
import { setListMusic } from '../../../state_manager/actions/listMusic';
//utils
import { scrollTop } from '../../../utils/scrollTop';
const PlayListMusic = ({ match }) => {

    scrollTop();

    const user = useSelector(state => state.user);
    const listMusic = useSelector(state => state.listMusic);
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetMusics();
        handleGetPlayListInfo();
    }, [])

    const [playList, setPlayList] = useState({});

    const handleGetMusics = async () => {
        // formData
        const listFormData = new FormData();
        listFormData.append('user_id', user.id);
        listFormData.append('playListId', match.params.id);

        await getMusicOfPlayList(listFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    dispatch(setListMusic(data))
                }
            }
        )


    }

    const handleGetPlayListInfo = async () => {
        // formData
        const listFormData = new FormData();
        listFormData.append('user_id', user.id);
        listFormData.append('playListId', match.params.id);

        await getPlayListInfo(listFormData).then(
            resolved => {
                const { status, data } = resolved;
                if (status === 200) {
                    setPlayList(data);
                }
            }
        )
    }

    return (
        <Fragment>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>{playList.name}</h1>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 padding_right40">

                            {listMusic.map((music, index) => (
                                <PlayListMusicItem
                                    key={music.id}
                                    music={music}
                                    index={index}
                                    currentPlayList={playList}
                                />
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(PlayListMusic);