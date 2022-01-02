import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <Fragment>
            <div className="ms_footer_wrapper">
                <div className="ms_footer_logo">
                    <Link to="/"><img src="images/open_logo.png" alt="" /></Link>
                </div>
                <div className="ms_footer_inner">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="footer_box">
                                <h1 className="footer_title">Diana Music</h1>
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. </p>
                            </div>
                        </div>
                       
                        <div className="col-lg-6 col-md-6">
                            <div className="footer_box footer_contacts">
                                <h1 className="footer_title">تماس با ما</h1>
                                <ul className="foo_con_info">
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/phone.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">تلفن های تماس :</span>
                                            <span>09337025184</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/message.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">ایمیل ما :</span>
                                            <span>alinikmehr128@yahoo.com</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="images/svg/add.svg" alt="" />
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">آدرس :</span>
                                            <span>شیراز تاچارا</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className="foo_sharing">
                                    <div className="share_title"></div>
                                    <ul>
                                        <li><Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="ms_copyright">
                        <div className="footer_border"></div>
                        <p>تمامی حقوق این سایت متعلق به دیانا موزیک می باشد </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Footer;