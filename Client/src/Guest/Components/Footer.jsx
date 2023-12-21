import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../Images/logo.png"
import { AiTwotonePhone } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { BiLogoTelegram } from 'react-icons/bi'
import { FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className='bg-dark'>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 py-3 pt-1">
              <img src={logo} alt="" />
              <p className='text-white'>Dukan24h allows you to run your business 24/7, helps to reduce your overhead cost, improves customer satisfaction, and grows your business.</p>
            </div>

            <div className="col-lg-1"></div>

            <div className="col-lg-2 col-md-6 col-sm-12 pt-1 widget">
              <h4>Menu</h4>
              <ul>
                <li> <a href="#">Home</a> </li>
                <li> <a href="#">FAQ</a> </li>
                <li> <a href="#">Contact</a> </li>
                <li> <a href="#">Shop - Login / Register</a> </li>
              </ul>
            </div>

            <div className="widget col-lg-3 col-md-6 col-sm-12 pt-1 ">
              <h4 className='text-uppercase'>information</h4>
              <ul>
                <li> <a href="tele:03366867902"><AiTwotonePhone /> 03366867902</a> </li>
                <li> <a href="mailto:info@dukan24h.com"><MdEmail />info@dukan24h.com
                </a> </li>
                <li className='telegram'><BiLogoTelegram />Powered By <a href="">Kodev Global PVT(LTD.)</a></li>
              </ul>
            </div>

            <div className="widget col-lg-2 col-md-6 col-sm-12 pt-1 ">
              <h4 className='text-uppercase'>follow up</h4>
              <ul className='social-icons'>
                <li><a href="#"><FaFacebookF /></a></li>
                <li><a href="#"><FaTwitter /></a></li>
                <li><a href="#"><FaInstagram /></a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="row">
              <p>Copyright © 2023 Dukan 24h. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};
export default Footer;
