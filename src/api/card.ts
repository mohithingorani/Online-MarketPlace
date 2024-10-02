"use server";

import axios from "axios";
import prisma from "../../db/db";

interface CardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  contact : number;
}

export async function addCard({ name, description, price, image, contact }: CardProps) {
  try {
    const card = prisma.card.create({
      data: {
        name,
        description,
        price,
        image,
        contact
      },
    });
    return card;
  } catch (e) {
    console.log(e);
    return -1;
  }
}

export async function getCards(search : string) {
  const items = await prisma.card.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return items;
}

export async function deleteCard(cardId: string) {
  const item = await prisma.card.delete({
    where: {
      id: cardId,
    },
  });
  return item;
}

export interface UploadImageProps {
  id: string;
  image: string;
  mimeType: string;
}


export async function uploadImage(id: string, image: string, mimeType: string) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}`,
      {
        id,
        image,
        mimeType,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.IEEE_CS_KEY}`,
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error to handle it where the function is called
  }
}
