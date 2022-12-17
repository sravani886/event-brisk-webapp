import React, {Component} from 'react';

export default function Contact(){
    return(
        <div class="m-sm-5 m-2 p-sm-4 p-2" style={{ backgroundColor:"#FFF0F0", borderRadius:'50px' }}>
            <div className='row m-sm-5 m-2 p-sm-5 p-2'>
                <div className='col-12 col-sm-6 p-sm-4 p-2'>
                    <h5><u>Location</u></h5>
                    <h6>123 Street,</h6>
                    <h6>ON X9X9X9</h6>
                </div>
                <div className='col-12 col-sm-6 p-sm-4 p-2'>
                    <h5><u>Availabile Hours for Help</u></h5>
                    <h6>Monday - Friday: 9AM - 5PM</h6>
                    <h6>Saturday - Sunday: 10AM - 5PM</h6>
                </div>
                <div className='col-12 col-sm-6 p-sm-4 p-2'>
                    <h5><u>Contact Details</u></h5>
                    <h6>Email: email@eventbrisk.com</h6>
                    <h6>Website: www.eventbrisk.com</h6>
                </div>
            </div>
        </div>
    )
}