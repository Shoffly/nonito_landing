import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ImageCarousel.module.css';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return; // Don't set up interval if there are no images

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return <div className={styles.carouselContainer}>No images to display</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      {images.map((image, index) => (
        <Link key={index} href={image.link}>
          <div
            className={`${styles.carouselItem} ${
              index === currentIndex ? styles.active : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ImageCarousel;