import React, { useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import axios from "axios";
import "./styles.css"

const CheckoutScreen = ({cart, changeQty, tableNo}) => {
    const navigate = useNavigate();
    const [tableNumber, setTableNumber] = useState(tableNo);
    const [cartTotal, setCartTotal] = useState(0);
    const socket = io("http://localhost:3000");

    let order = {};
    let total = 0;

    const confirm = async () => {
        // navigate('/success');
        order['items'] = [];
        cart.forEach((item) => {
        order['items'].push({
            itemId : item.itemId,
            itemName : item.itemName,
            itemQty : item.itemQty,
            itemPrice : item.itemPrice
        });
        });
        order['totalAmount'] = cartTotal + 20;
        order['tableNo'] = tableNumber;

        createOrder(order);
        
    }

    const createOrder = async (order) => {
        console.log(order);
        await axios.post('http://localhost:3000/api/orders', order).then((res) => {
            if(res.status === 200) {
                socket.emit("orderPlaced", { item: 1, userId: res.data.data.assignedServerId });
                localStorage.removeItem("cartStore");
                navigate('/success', {state: res.data.data});
            }
        })
    }

    useEffect(() => {
        socket.emit("userJoin", { userType: "customer" });
        cart.forEach(item => {
            total += item.itemPrice * item.itemQty;
        });
        setCartTotal(total);
    }, [cart])

    return (
        <>
            <div className="checkout">
                <div className="backHeader">
                    <div className="row">
                        <IconContext.Provider value={{ size: 30 }}>
                            <IoMdArrowBack onClick={() => navigate(-1)} />
                        </IconContext.Provider>
                        <div className="title">Review & Place Order</div>
                    </div>
                </div>
                <div className="content">
                    <div className="container">
                        <h4>Item Details</h4>
                        {cart.map((item) => {
                            return(
                            <div className="itemRow">
                                <div className="left">
                                    <div className="itemName">{item.itemName}</div>
                                    <p>₹ {item.itemPrice * item.itemQty}</p>
                                </div>
                                <div className="right">
                                    <div className="counter">
                                        <p className="operator" onClick={() => changeQty(item.itemId, 'remove')}>-</p>
                                        <p className="qty">{item.itemQty}</p>
                                        <p className="operator" onClick={() => changeQty(item.itemId, 'add')}>+</p>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                        
                    </div>
                    <div className="container">
                        <h4>Billing Details</h4>
                        <div className="billingRow">
                            <div className="left">
                                <p>Item Total:</p>
                            </div>
                            <div className="right">
                                <p>₹ {cartTotal}</p>
                            </div>
                        </div>
                        <div className="billingRow">
                            <div className="left">
                                <p>Tax Total:</p>
                            </div>
                            <div className="right">
                                <p>₹ 20</p>
                            </div>
                        </div>
                        <div className="billingRow">
                            <div className="left">
                                <p>Discounts:</p>
                            </div>
                            <div className="right">
                                <p>- ₹ 0</p>
                            </div>
                        </div>
                        <div className="billingRow" style={{marginTop: '2rem'}}>
                            <div className="left">
                                <p style={{fontWeight: 'bold'}}>Total:</p>
                            </div>
                            <div className="right">
                                <p style={{fontWeight: 'bold'}}>₹ {cartTotal + 20}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={confirm} className="checkoutBtn">Confirm Order</button>  
                </div>  
            </div>
        </>
    )
}

export default CheckoutScreen