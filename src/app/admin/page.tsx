"use client";
import { deleteCard, getCards } from "@/api/card";
import { CardData } from "../buy/page";
import { useEffect, useState } from "react";

export default function Admin() {
  const [cards, setCards] = useState<CardData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const fetchedCards = await getCards();
        // Ensure 'contact' is a string in each card
        const formattedCards: CardData[] = fetchedCards.map((card: any) => ({
          ...card,
          contact: card.contact.toString(), // Convert contact from bigint to string
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
        setError("Failed to load cards");
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  async function handleDelete(cardId: string) {
    try {
      await deleteCard(cardId);
      setCards((prevCards) =>
        prevCards ? prevCards.filter((card) => card.id !== cardId) : null
      );
      console.log("Card deleted successfully");
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cards === null || cards.length === 0) {
    return <div>No cards available.</div>;
  }

  return (
    <div className="flex flex-col items-center px-8">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Description</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="">
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="border border-gray-200 px-4 py-2">
                {card.name}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {card.description}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {card.price}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-blue-600 hover:underline hover:text-blue-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
