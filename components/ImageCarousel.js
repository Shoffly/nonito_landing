import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ImageCarousel.module.css';

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) {
    return <div className={styles.carouselWrapper}>No images to display</div>;
  }

  // Duplicate the images array to create a seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {duplicatedImages.map((image, index) => (
            <div key={index} className={styles.carouselItem}>
              <Link href={image.link}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  layout="responsive"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;