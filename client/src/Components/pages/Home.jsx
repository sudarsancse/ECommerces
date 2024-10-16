import React from "react";
import Hero from "../component/Hero";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";
import Policy from "../component/Policy";
import NewsLetter from "../component/NewsLetter";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewsLetter />
    </div>
  );
}

export default Home;
