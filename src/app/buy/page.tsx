"use client";
import { getCards } from "@/api/card";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface CardData {
  id: string;
  name: string;
  description : string
  price: number;
}

export default function Buy() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    async function getItems() {
      const fetchedCards = await getCards();
      setCards(fetchedCards);
    }

    getItems();
  }, []);

  return (
    <>
      <Cards cards={cards} />
    </>
  );
}

interface CardsProps {
  cards: CardData[];
}

export function Cards({ cards }: CardsProps) {
  return (
    <div className="flex justify-start gap-8">
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          price={card.price}
          imageSrc="/c1.JPG"
        />
      ))}
    </div>
  );
}

interface CardProps {
  name: string;
  price: number;
  imageSrc: string;
}

export function Card({ name, price, imageSrc }: CardProps) {
  return (
    <div className="px-4 py-8">
      <div className="h-full bg-white py-2 border rounded-md shadow-md max-w-fit flex flex-col justify-center items-center px-4 gap-2">
        <div>
          <Image src={imageSrc} width="150" height="150" alt={name} />
        </div>
        <div>{name}</div>
        <div className="text-sm text-gray-600">{`Rs. ${price}/-`}</div>
        <button className="border border-green-700 rounded-full px-2 text-green-700">
          Contact
        </button>
      </div>
    </div>
  );
}
