import React from 'react'
import FbSvg from '../img/svg/fb.svg'
import LinkedinSvg from '../img/svg/linkedin.svg'
const Footer = () => {
    return (
        <footer>
            <h3 className='footerCopy'>Copyright © 2023 - MeditNow - </h3>
            <div className="footerSvgBox">
                <a target={'_blank'} href="https://www.facebook.com/riccardocacio"> <img className='footerSvg' src={FbSvg} alt="" /></a>
                <a target={'_blank'} href="https://www.linkedin.com/in/riccardo-cacio-98713017a/"><img className='footerSvg' src={LinkedinSvg} alt="" /></a>
            </div>
            <h4 className='footerDev'>Developed By Riccardo Cacio</h4>
        </footer>
    )
}

export default Footer
