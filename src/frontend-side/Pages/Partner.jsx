import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PartnerCarousel from "../Components/PartnerCarousel";

const Partner = () => {
  return (
    <div>
      <Header />
      <PartnerCarousel />
      <Footer />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </div>
  );
};

export default Partner;
