import React, { useState, useEffect } from 'react';
import banner1 from '../Images/banner 1.svg';
import banner2 from '../Images/banner 2.svg';
import banner3 from '../Images/banner 3.svg';

export default function UserCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      setActiveIndex(nextIndex);
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
      <div className="container">

      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={index}
            className={activeIndex === index ? "active" : ""}
            aria-current={activeIndex === index ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item ${activeIndex === index ? "active" : ""}`}
            data-bs-interval={3000}
          >
            <img src={banner} className="d-block w-100" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
      </div>

    </div>
  );
}
