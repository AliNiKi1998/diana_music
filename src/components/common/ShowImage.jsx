import React from "react";
import Img from 'react-image';
import BounceLoader from 'react-spinners/BounceLoader';

import config from './../../services/config.json';

const ShowImage = ({ image , size }) => {
    return (
        <Img
            src={[
                `${config.nic_music}${image}`,
                "https://via.placeholder.com/250x250"
            ]}
            loader={
                <div className="text-center mx-auto">
                    <BounceLoader loading={true} color={"#FF4865"} size={size} />
                </div>
            }
        />
    );
};

export default ShowImage;