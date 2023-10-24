import React from "react";
import styles from "./reviews.module.scss";
import star from "../../assets/images/star-icon.png";
import starActive from "../../assets/images/star-icon-active.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = ({ data }) => {
  const sliderSetting = {
    centerMode: true,
    centerPadding: "0",
    dots: true,
    arrows: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "0",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className={`${styles.reviews} reviewSlider`}>
      <div className="container">
        <h2 data-title="Client Testimonials">
          Hear What Our Clients Have To Say
        </h2>
        <Slider {...sliderSetting}>
          {data.map((item) => (
            <div className={styles.item} key={item.name}>
              <div className={styles.cover}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className={styles.info}>
                  <div className={styles.info__img}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={styles.info__text}>
                    <span className={styles.name}>{item.name}</span>
                    <ul>
                      {Array(5)
                        ?.fill(1)
                        ?.map((_, idx) => (
                          <li>
                            <img
                              src={item.rating > idx + 1 ? starActive : star}
                              alt=""
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
export default Reviews;
