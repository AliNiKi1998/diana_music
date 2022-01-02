import React from 'react';

import Footer from '../common/Footer';
import Player from '../common/Player';
import PlayList from '../common/PlayList';
import TopBar from '../common/TopBar';



const MainLayoout = ({ children }) => {
    return (

        <div>


            <div className="ms_main_wrapper">

                {/* topBar */}
                <TopBar />

                {/* content */}
                <div className="ms_content_wrapper padder_top80">
                    {children}
                </div>

                {/* footer */}
                <Footer />

                {/* player */}
                <Player />

                {/* play list */}
                <PlayList />
            </div>

        </div>
    );
}

export default MainLayoout;