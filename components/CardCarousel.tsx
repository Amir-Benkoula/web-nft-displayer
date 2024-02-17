import React, { useRef, useEffect } from 'react';

export default function CardCarousel() {
  const cards: JSX.Element[] = [];

  const getRandomImage = () => {
    // Exemple d'URL d'image aléatoire à des fins de démonstration
    const images = [
      'scroller_1.png',
      'scroller_2.png',
      'scroller_3.png',
      'scroller_4.png',
      'scroller_5.png',
      'scroller_6.png',
      'scroller_7.png',
      'scroller_8.png',
      'scroller_9.png',
      'scroller_10.png',
      'scroller_11.png',
      'scroller_12.png',
      'scroller_13.png',
      'scroller_14.png',
      'scroller_15.png',
      'scroller_16.png',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  for (let i = 0; i < 15; i++) {
    const randomImage = getRandomImage();
    cards.push(<Card key={i} imageUrl={randomImage} />);
  }
  return (
    <>
      <div className="scroller" data-direction="left">
        <div className="scroller__inner">
          {cards}
        </div>
      </div>
      <div className="scroller" data-direction="right">
        <div className="scroller__inner">
          {cards}
        </div>
      </div>
    </>
  );
}

interface CardProps {
  imageUrl: string;
}

function Card({ imageUrl }: CardProps) {
  return (
    <div className="card">
      <img src={imageUrl}/>
    </div>
  );
}

