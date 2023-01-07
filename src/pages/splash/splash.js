import React, {useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';

import './styles.css';

const SplashScreen = ({tableNo, setTable,}) => {

    const navigate = useNavigate();
    const { table } = useParams();

    useEffect(() => {
        setTable(table);
        setTimeout(() => {
            navigate('/menu');
          }, 2000);
    },[]);

    return (
        <>
            <div className="splashContainer">
                <img className="logo" src={"/images/kanthari_logo_dark.png"} alt="Logo" />
            </div>
        </>
    )

}

export default SplashScreen