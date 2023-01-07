import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/splash/splash';
import MainScreen from './pages/main/main';
import CheckoutScreen from './pages/checkout/checkout';
import SuccessScreen from './pages/success/success';
import TestScreen from './pages/test';
import ErrorScreen from './pages/error/error';

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartStore") || "[]");

function App() {
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [tableNo, setTableNo] = useState();

  useEffect(() => {
    localStorage.setItem('cartStore', JSON.stringify(cart));
  }, [cart]);

  const setTable = (tableNo) => {
    setTableNo(tableNo);
  }

    const addItem = (item) => {
        let itemDetails = {};
        itemDetails = {
            itemId : item.product_id,
            itemName : item.product_name,
            itemQty : 1,
            itemPrice : item.price
        }
        setCart([...cart, itemDetails]);
    }


    const changeQty = (id, operator) => {
        if(operator == 'add') {
            setCart(current =>
                current.map(obj => {
                  if (obj.itemId === id) {
                    let qty = obj.itemQty + 1;
                    return {...obj, itemQty : qty};
                  }
                  return obj;
                }),
            );
            localStorage.setItem('cartStore', cart);
        }
        if(operator == 'remove') {
            let product = cart.find(item => item.itemId === id);
            if(product.itemQty === 1) {
                setCart(current =>
                    current.filter(obj => {
                      return obj.itemId !== id;
                    }),
                );
                localStorage.setItem('cartStore', cart);
            } else {
                setCart(current =>
                    current.map(obj => {
                      if (obj.itemId === id) {
                        let qty = obj.itemQty - 1;
                        return {...obj, itemQty : qty};
                      }
                      return obj;
                    }),
                );
                localStorage.setItem('cartStore', cart);
            }
        }   
    }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<SplashScreen tableNo={tableNo} setTable={setTable} />} path = "/table/:table" />
        </Routes>
        <Routes>
          <Route element={<MainScreen cart={cart} tableNo={tableNo}  setCart={setCart} addItem={addItem} changeQty={changeQty} />} path = "/menu" />
        </Routes>
        <Routes>
          <Route element={<CheckoutScreen tableNo={tableNo} cart={cart} setCart={setCart} addItem={addItem} changeQty={changeQty} />} path = "/checkout" />
        </Routes>
        <Routes>
          <Route element={<SuccessScreen tableNo={tableNo} />} path = "/success" />
        </Routes>
        <Routes>
          <Route path="*" element={<ErrorScreen to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
