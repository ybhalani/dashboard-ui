'use client';

import React, { useState, useEffect } from "react";
import Illustration from '../../../public/illustration.svg';
import Image from "next/image";
import Col from "react-bootstrap/Col";

interface RightSectionProps {
    illustrationSrc: any; // Add a prop for the illustration source
    altText: string; // Add a prop for the alt text
    ariaLabel: string; // Add a prop for the aria label
}

const RightSection: React.FC<RightSectionProps> = ({ illustrationSrc, altText, ariaLabel }) => {
    const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0 or a default width

    useEffect(() => {
        // Ensure window object is used only after component mounts
        setWindowWidth(window.innerWidth);
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const imageWidth = windowWidth > 768 ? 625.04 : windowWidth * 0.8; // Adjust the multiplier for desired width on smaller screens
    const imageHeight = windowWidth > 768 ? 624 : imageWidth; // Maintain aspect ratio
    const col = windowWidth > 768 && windowWidth < 1024  ? 7 : 6; // Maintain aspect ratio

    return (
        <Col lg={col} className={'right-section d-flex flex-wrap justify-content-center align-items-center'}>
            <Image
                src={illustrationSrc}
                alt={altText}
                aria-label={ariaLabel}
                width={imageWidth}
                height={imageHeight}
                priority
            />
        </Col>
    )
}

export default RightSection;