import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo_ver_1} alt="" />
            <p>เราคือร้านบะหมี่ที่คัดสรรวัตถุดิบอย่างดี เพื่อเสิร์ฟความอร่อยให้คุณทุกคำ ด้วยน้ำซุปที่เคี่ยวอย่างพิถีพิถัน เส้นบะหมี่สดใหม่และรสชาติที่เข้มข้นไม่เหมือนใคร 
            เรามุ่งมั่นที่จะให้คุณได้รับประสบการณ์การทานที่ดีที่สุด ไม่ว่าจะเป็นบะหมี่น้ำ บะหมี่แห้ง หรือเกี๊ยว ที่นี่มีให้เลือกหลากหลายพร้อมเสิร์ฟคุณทุกวัน!</p>
        </div>
        <div className="footer-content-center">
            <h2>เกี่ยวกับเรา</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Service</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>ติดต่อและร้องเรียน</h2>
            <ul>
                <li>012-345-6789</li>
                <li>contact@sofood.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
