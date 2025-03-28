import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Something Went Wrong")
            }
        }
        else {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Something Went Wrong")
            }
        }

    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>ข้อมูลผู้รับซื้อ</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='ชื่อ' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='นามสกุล' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='อีเมล' required />
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='เบอร์โทรศัพท์' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>รายการสั่งซื้อ</h2>
                    <div>
                    <div className="cart-total-details"><p>ราคารวม</p><p>{getTotalCartAmount()} {currency}</p></div>
                    <hr />
                    <div className="cart-total-details"><p>ค่าบริการ</p><p>{getTotalCartAmount() === 0 ? 0 : deliveryCharge} {currency}</p></div>
                    <hr />
                    <div className="cart-total-details"><b>ราคาสุทธิ</b><b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge} {currency}</b></div>

                    </div>
                </div>
                <div className="payment">
                    <h2>ชำระเงิน</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>จ่ายหน้าร้าน</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment === "cod" ? "ยืนยันการสั่งซื้อ" : "ดำเนินการชำระเงิน"}</button>
            </div>
        </form>
    )
}

export default PlaceOrder
