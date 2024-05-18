'use client';

import React from "react";
import Illustration from '../../../public/illustration.svg';
import Image from "next/image";
import Col from "react-bootstrap/Col";

export default function RightSection() {
    return (
        <Col lg={7} className={'right-section d-flex flex-wrap justify-content-center align-items-center'}>
            <Image
                src={Illustration}
                alt="Right section background"
                width={625.04}
                height={624}
                priority
            />

        </Col>
    )
}
