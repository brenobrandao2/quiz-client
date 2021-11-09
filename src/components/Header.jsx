import React, { useEffect, useState } from 'react';
import '../css/Header.css'
// import logo from '../assets/LogoLifeAndMoney.png'
import { getImages } from '../repository/quiz.repository';

const Header = () => {
    const [logo, setLogo] = useState()

    useEffect(() => {
        const setImages = async () => {
            const allImages = await getImages()
            const logoDoc = allImages && allImages.length > 0 ? allImages.find(image => image.tipo === 'logo') : ''
            
            if (logoDoc) {
            setLogo(`data:${logoDoc.logo.mimetype};base64,${logoDoc.logo.buffer}`)
            }
        }

        setImages()
    },[])

    return (
        <div className="Header-container">
            { logo ? <img src={logo} alt="Logo" className="Header-logo"/> : null}
        </div>
    );
};

export default Header;