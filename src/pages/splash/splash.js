import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import './styles.css';

const SplashScreen = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            navigate('/menu');
          }, 2000);
    },[]);

    return (
        <>
            <div className="splashContainer">
                <img className="logo" src={"/images/kanthari_logo.png"} alt="Logo" />
            </div>
        </>
    )

}

export default SplashScreen