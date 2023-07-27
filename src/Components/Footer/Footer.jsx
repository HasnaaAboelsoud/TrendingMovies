import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return <footer className='mt-5 p-2 p-md-5'>
        <div className='row px-0 mx-0 justify-content-between align-items-center'>
            <div className='col-md-4'>
                <h5>About Us</h5>
                <ul className='list-unstyled h6 text-muted'> 
                    <li><i class="fa-solid fa-phone"></i> 01065674517</li>
                    <li><i class="fa-solid fa-envelope"></i> hasnaa.aboelsoud96@gmail.com</li>
                </ul>
            </div>
            <div className='col-md-4 mt-3 mt-md-0'>
                <h6>Further Informations</h6>
                <p className='ms-2 text-muted'>Terms & conditions <br/>Policy</p>
            </div>
            <div className='col-md-4 mt-3 mt-md-0'>
                <h5>Join Us</h5>
                <ul className='list-unstyled text-muted'>
                    <li className="nav-item d-flex align-items-center">
                        <i className='fab mx-2 fa-facebook ms-2'></i>
                        <Link className='text-muted' to="https://github.com/HasnaaAboelsoud?tab=repositories"><i className="fa-brands fa-github ms-2"></i></Link>
                        <i className='fab mx-2 fa-instagram ms-3'></i>
                        <Link to="https://www.linkedin.com/in/hasnaa-aboelsoud-248b4127a" className='text-muted'><i className="fa-brands fa-linkedin-in ms-2"></i></Link>
                    </li>
                </ul>
            </div>
    </div></footer>
}
