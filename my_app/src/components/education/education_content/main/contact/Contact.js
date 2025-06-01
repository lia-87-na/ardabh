import React from 'react'
import './contact.scss'
import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
    return (
        <div className='contact'>
            <h2>Կապ</h2>
            <p>
                <CiLocationOn />
                <a href="https://www.google.com/maps/dir/''/40.207868,44.5375998/@40.2082251,44.5332742,17z/data=!4m9!4m8!1m5!1m1!1s0x406aa2d1c369f437:0x8a73f2894abc6242!2m2!1d44.5376141!2d40.2081343!1m0!3e0?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/dir//ARDA+Trade+and+Technology+Center,+Paruyr+Sevak+Street,+Yerevan/@40.2081755,44.4554427,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0x406aa2d1c2ea948b:0x2ae01dd15526541c!2m2!1d44.5378036!2d40.2080483!3e2?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/dir/''/40.207868,44.5375998/@40.2080052,44.5351127,17z/data=!3m1!4b1!4m9!4m8!1m5!1m1!1s0x406aa2d1c369f437:0x8a73f2894abc6242!2m2!1d44.5376141!2d40.2081343!1m0!3e2?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                    Պարույր Սևակ 9
                </a>
            </p>
            <p>
                <BsTelephone />
                <a href="tel:+37477053446"> +374 77 053446</a>
            </p>
            <p>
                <BsTelephone />
                <a href="tel:+37498771255"> +374 98 771255</a>
            </p>

            <p>
                <HiOutlineMail />
                <a href="mailto:arda.agm@gmail.com"> ardaeducation2025@gmail.com</a>
            </p>
         
        </div>
    )
}
