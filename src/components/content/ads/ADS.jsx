import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';


const ADS = () => {
    return (
        <Fragment>
            <div className="ms_advr_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Link to="/"><img src="images/adv.jpg" alt="" className="img-fluid" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ADS;