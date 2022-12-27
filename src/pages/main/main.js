import React, {useState, useEffect} from "react"
import { IconContext } from "react-icons";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './styles.css';

const MainScreen = ({cart, tableNo, setTable, changeQty, addItem}) => {
    const navigate = useNavigate();
    const { table } = useParams();
    const [searchString, setSearchString] = useState('');
    const [products, setProducts] = useState([]);
    
    const checkout = () => {
        navigate('/checkout');
    }

    const handleSearchChange = (searchValue) => {
        setSearchString(searchValue);
    }

    useEffect(() => {
        setTable(table);
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get('http://localhost:3000/api/products', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setProducts(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className="header">
                <div className="row">
                    <img className="header_logo" src="/images/kanthari_logo.png" alt="" />
                    <p className="tableNo">Table No: {tableNo}</p>
                </div>
                <input value={searchString} onChange={(e) => {handleSearchChange(e.target.value)}} type="text" placeholder="Search for Item" />
            </div>
            <div className="content">
                <div className="categoryHead">
                    <h4>Starters</h4>
                </div>
                {products.filter((item) => {
                    return searchString.toLowerCase() === '' ? item : item.product_name.toLowerCase().includes(searchString.toLowerCase())
                }).map((product) => {
                 return(
                    <div className="menuContainer" key={product.product_id}>
                        <p className="vegType nonVeg">Non-Veg</p>
                        <div className="row">
                            <div className="itemDetails">
                                <h4 className="itemName">{product.product_name}</h4>
                                <div className="review">
                                    <IconContext.Provider value={{ color: "#ffa600",  }}>
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiFillStar />
                                        <AiOutlineStar />
                                    </IconContext.Provider>
                                </div>
                                <div className="price">
                                    <p>₹ {product.price}</p>
                                </div>
                                <div className="desc">
                                    <p>{product.product_desc}</p>
                                </div>
                            </div>
                            <div className="itemImage">
                                <div className="imageContainer">
                                    <img src="/images/Chicken Tikka.jpg" alt="" />
                                    {cart.some(el => el.itemId === product.product_id) ? 
                                        <div className="counter">
                                            <p className="operator" onClick={() => changeQty(product.product_id, 'remove')}>-</p>
                                            <p className="qty">{cart.find(item => item.itemId === product.product_id).itemQty}</p>
                                            <p className="operator" onClick={() => changeQty(product.product_id, 'add')}>+</p>
                                        </div>
                                    : 
                                        <button onClick={() => addItem(product)} className="btn">Add +</button>
                                    } 
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                 );
                })}
            </div>
            {cart.length > 0 ? 
            <div className="footer-btn" onClick={checkout}>
                <p>{cart.length} Item Added</p>
                <p>Checkout</p>
            </div> : '' }
            
        </>
    )

}

export default MainScreen;