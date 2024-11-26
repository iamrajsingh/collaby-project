import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProjectList from "../Components/ProjectList";
import apiService from "./../../service/apiService";
import Carousel from 'react-material-ui-carousel';
import { FadeLoader } from "react-spinners";

const Project = () => {
  const [activeSlideIndex1, setActiveSlideIndex1] = useState(0);
  const [activeSlideIndex2, setActiveSlideIndex2] = useState(0);
  const [activeSlideIndex3, setActiveSlideIndex3] = useState(0);
  const [firstSlider, setFirstSlider] = useState([]);
  const [secondSlider, setSecondSlider] = useState([]);
  const [thirdSlider, setThirdSlider] = useState([]);
  const [highlightActive, setHighlightActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFirstSlider();
    fetchSecondSlider();
    fetchThirdSlider();
  }, []);

  const handleImageClick = (link) => {
    const isAbsoluteUrl =
      link.startsWith("http://") || link.startsWith("https://");
    if (isAbsoluteUrl) {
      window.open(link, "_blank");
    } else {
      window.open(`http://${link}`, "_blank");
    }
  };

  const fetchFirstSlider = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get("front/first_slider/");
      if (response.data && Array.isArray(response.data)) {
        setTimeout(() => {
          setFirstSlider(response.data);
          setIsLoading(false);
        }, 700);
      }
    } catch (error) {}
  };

  const fetchSecondSlider = async () => {
    try {
      const response = await apiService.get("front/second_slider/");
      if (response.data && Array.isArray(response.data)) {
        setTimeout(() => {
          setSecondSlider(response.data);
        }, 700);
      }
    } catch (error) {}
  };

  const fetchThirdSlider = async () => {
    try {
      const response = await apiService.get("front/third_slider/");
      if (response.data && Array.isArray(response.data)) {
        setTimeout(() => {
          setThirdSlider(response.data);
        }, 700);
      }
    } catch (error) {}
  };

  const handleHighlightToggle = () => {
    setHighlightActive((prevState) => !prevState);
  };

  return (
    <>
      <Header />

      <div className="slider-Sec">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-8 col-8">
              <div className="slideHead">
                <h2>Match Your Project With Potential Partners</h2>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mySwitch"
                  name="darkmode"
                  value="yes"
                  onChange={handleHighlightToggle}
                  checked={highlightActive}
                />
                <label className="form-check-label" htmlFor="mySwitch">
                  Highlight
                </label>
              </div>
            </div>

            <div className="col-md-12 col-sm-12 col-12">
              {isLoading && (
                <FadeLoader
                  color="#f33984"
                  loading={isLoading}
                  size={250}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="adloader"
                />
              )}
            </div>
            {/* First Slider */}
            {highlightActive && (
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    autoPlay={true}
                    interval={6000}
                    infiniteLoop={true}
                    emulateTouch={true}
                  >
                    {firstSlider &&
                      firstSlider.map(muiCarousel => (
                        <div key={muiCarousel.id} onClick={() => handleImageClick(muiCarousel.link)}>
                          <img src={muiCarousel.image} alt={muiCarousel.title} />
                        </div>
                      ))}
                  </Carousel>
                </div>
              </div>
            )}

            {/* Second Slider */}
            {highlightActive && (
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    autoPlay={true}
                    interval={6000}
                    infiniteLoop={true}
                    emulateTouch={true}
                  >
                    {secondSlider &&
                      secondSlider.map(muiCarousel => (
                        <div key={muiCarousel.id} onClick={() => handleImageClick(muiCarousel.link)}>
                          <img src={muiCarousel.image} alt={muiCarousel.title} />
                        </div>
                      ))}
                  </Carousel>
                </div>
              </div>
            )}

            {/* Third Slider */}
            {highlightActive && (
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="adSlider">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    autoPlay={true}
                    interval={6000}
                    infiniteLoop={true}
                    emulateTouch={true}
                  >
                    {thirdSlider &&
                      thirdSlider.map(muiCarousel => (
                        <div key={muiCarousel.id} onClick={() => handleImageClick(muiCarousel.link)}>
                          <img src={muiCarousel.image} alt={muiCarousel.title} />
                        </div>
                      ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProjectList />

      <Footer />
    </>
  );
};

export default Project;
