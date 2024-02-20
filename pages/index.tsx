import React, { useContext } from "react";
import CardCarousel from "../components/CardCarousel";

export default function Home(props: any) {
  return (
    <div className="home-container">
      <CardCarousel direction="right"/>
      <h1 className="title">Explore and save your favorite nft&apos;s</h1>
      <CardCarousel direction="left"/>
      <CardCarousel direction="right"/>
    </div>
  );
}
