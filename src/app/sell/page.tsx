"use client";

import { addCard, uploadImage } from "@/api/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Heading({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold text-4xl text-white mb-2">{children}</div>;
}

export function SemiHeading({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-300 text-lg mb-2">{children}</div>;
}

export function ProductInputBox({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  return (
    <input
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-white border-opacity-50 px-4 py-2 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export function QuantityInputBox({
  setValue,
}: {
  setValue: (value: number) => void;
}) {
  return (
    <input
      onChange={(e) => setValue(parseInt(e.target.value))}
      type="number"
      className="w-full border border-white border-opacity-50 px-4 py-2 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export function PriceInputBox({
  setValue,
}: {
  setValue: (value: number) => void;
}) {
  return (
    <input
      onChange={(e) => setValue(parseInt(e.target.value))}
      type="number"
      className="w-full border border-white border-opacity-50 px-4 py-2 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export function DescriptionBox({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  return (
    <textarea
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-white border-opacity-50 px-4 py-2 bg-transparent text-white rounded-md min-h-[128px] focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export function ContactBox({
  setValue,
}: {
  setValue: (value: number) => void;
}) {
  return (
    <input
      type="number"
      onChange={(e) => setValue(parseInt(e.target.value))}
      className="w-full border border-white border-opacity-50 px-4 py-2 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
}

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full flex justify-center items-center mt-4">
      <button
        type="button"
        onClick={onClick}
        className="text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-600 font-medium rounded-lg text-base px-6 py-3 w-full max-w-xs transition duration-150 ease-in-out"
      >
        Add Item
      </button>
    </div>
  );
}

export default function Sell() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | undefined>();
  const [contact, setContact] = useState<number>(0);
  const router = useRouter();

  function generateUUIDv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  async function imageInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
  }

  async function handleAddItem() {
    console.log({ name, description, price, quantity, image, contact });
    if (!(name && description && price && quantity && image && contact)) {
      return alert(
        "Name, description, price, quantity, and image are mandatory."
      );
    }
    try {
      const reader = new FileReader();

      reader.onload = async function () {
        const imageData = btoa(reader.result as string);
        try {
          const uuid = generateUUIDv4();
          const response = await uploadImage(uuid, imageData, image.type);
          console.log(response);
          const fileExt = image.type.split("/")[1];
          const imageUrl = `https://awesomesam.dev/api/ieee/${uuid}.${fileExt}`;
          const imgUrlFinal = encodeURI(imageUrl);
          const item = await addCard({
            name,
            description,
            price,
            image: imgUrlFinal,
            contact: contact,
          });
          router.push("/buy");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

      reader.onerror = function () {
        console.error("File reading failed");
      };

      reader.readAsBinaryString(image);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* General Information */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg border border-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Heading>General Information</Heading>
            <div>
              <SemiHeading>Product Name</SemiHeading>
              <ProductInputBox setValue={setName} />
            </div>
            <div>
              <SemiHeading>Your Contact Number</SemiHeading>
              <ContactBox setValue={setContact} />
            </div>
            <div>
              <SemiHeading>Description</SemiHeading>
              <DescriptionBox setValue={setDescription} />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg border border-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Heading>Pricing</Heading>
            <div>
              <SemiHeading>Best Price</SemiHeading>
              <PriceInputBox setValue={setPrice} />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg border border-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Heading>Inventory</Heading>
            <div>
              <SemiHeading>Quantity</SemiHeading>
              <QuantityInputBox setValue={setQuantity} />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg border border-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Heading>Image</Heading>
            <div>
              <SemiHeading>Product Image</SemiHeading>
              <input
                type="file"
                accept="image/*"
                name="file"
                onChange={imageInput}
                className="text-white"
              />
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-center">
          <AddButton onClick={handleAddItem} />
        </div>
      </div>
    </div>
  );
}
