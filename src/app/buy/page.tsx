"use client";
import { getCards } from "@/api/card";
import Image from "next/image";
import { useEffect, useState } from "react";

// Interface for card data
export interface CardData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  contact: string; // Expecting contact to be a string
}

// Main component for displaying cards
export default function Buy() {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    async function getItems() {
      const fetchedCards = await getCards();
      // Map through the fetched cards and ensure 'contact' is a string
      const formattedCards: CardData[] = fetchedCards.map((card: any) => ({
        ...card,
        contact: card.contact.toString(), // Convert contact from bigint to string
      }));
      setCards(formattedCards);
    }

    getItems();
  }, []);

  return <Cards cards={cards} />;
}

// Interface for props passed to Cards component
interface CardsProps {
  cards: CardData[];
}

// Component to display all cards
export function Cards({ cards }: CardsProps) {
  return (
    <div className="flex justify-start gap-8">
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          price={card.price}
          imageSrc={card.image}
          contact={card.contact}
        />
      ))}
    </div>
  );
}

// Interface for props passed to Card component
interface CardProps {
  name: string;
  price: number;
  imageSrc: string;
  contact: string;
}

// Component to display an individual card
export function Card({ name, price, imageSrc, contact }: CardProps) {
  const [showContact, setShowContact] = useState(false);

  // Toggle function to show/hide contact information
  function toggleShow() {
    setShowContact((prev) => !prev);
  }

  return (
    <div className="px-4 py-8">
      <div className="h-full bg-white py-2 border rounded-md shadow-md max-w-fit flex flex-col justify-between items-center px-4 gap-2">
        <div className="w-[10rem] flex-col justify-center items-center">
          <Image
            className="h-full bg-contain"
            src={imageSrc}
            width={150}
            height={100}
            alt={name}
          />
        </div>
        <div className="flex gap-2 flex-col justify-center items-center">
          <div>{name}</div>
          <div className="text-sm text-gray-600">{`Rs. ${price}/-`}</div>
          <div className="w-full">
            <button
              onClick={toggleShow}
              className="max-w-full w-max mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              {showContact ? contact : "Show Contact"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
