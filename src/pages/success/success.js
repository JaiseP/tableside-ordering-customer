import React from "react";
import Lottie from 'react-lottie';
import { useNavigate, useLocation } from 'react-router-dom';
import * as animationData from '../../assets/success.json';
import "./styles.css";

const SuccessScreen = ({tableNo}) => {
    const {state} = useLocation();
    console.log(state);
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return(
        <>
            <div className="success">
                <div className="successMessage">
                    <Lottie options={defaultOptions}
                    height={200}
                    width={200}
                    />
                    <h4>Your Order Has Placed Successfully</h4>
                    <p>Order No: KN{state.orderId}</p>
                    <p className="successSmall">{state.assignedServerName} will serve your order at table <span className="bold">{tableNo}</span> once the food is ready.</p>
                </div>
            </div>
        </>
    )
}

export default SuccessScreen;