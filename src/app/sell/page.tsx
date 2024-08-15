"use client";

import { addCard, uploadImage } from "@/api/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Heading({ children }: { children: React.ReactNode }) {
  return <div className="font-medium text-3xl">{children}</div>;
}

export function SemiHeading({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-800 text-xl">{children}</div>;
}

export function ProductInputBox({ setValue }: { setValue: (value: string) => void }) {
  return (
    <input
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 px-3 py-1.5 bg-gray-100 rounded-md"
    />
  );
}

export function QuantityInputBox({ setValue }: { setValue: (value: number) => void }) {
  return (
    <input
      onChange={(e) => setValue(parseInt(e.target.value))}
      type="number"
      className="w-full border border-gray-300 px-3 py-1.5 bg-gray-100 rounded-md"
    />
  );
}

export function PriceInputBox({ setValue }: { setValue: (value: number) => void }) {
  return (
    <input
      onChange={(e) => setValue(parseInt(e.target.value))}
      type="number"
      className="w-full border border-gray-300 px-3 py-1.5 bg-gray-100 rounded-md"
    />
  );
}

export function DescriptionBox({ setValue }: { setValue: (value: string) => void }) {
  return (
    <textarea
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 px-3 py-1.5 bg-gray-100 rounded-md min-h-[128px]"
    />
  );
}

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full flex justify-center items-center">
      <button
        type="button"
        onClick={onClick}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 max-w-md w-full"
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
  const router = useRouter();

  function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

  async function imageInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function () {
      const imageData = btoa(reader.result as string);
      try {
        const uuid = generateUUIDv4();
        const response = await uploadImage(uuid, imageData, file.type);
        console.log(response);
        const fileExt = file.type.split('/')[1];
        const imageUrl = `https://awesomesam.dev/api/ieee/${uuid}.${fileExt}`
        console.log(encodeURI(imageUrl));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    reader.onerror = function () {
      console.error("File reading failed");
    };

    reader.readAsBinaryString(file);
  }

  async function handleAddItem() {
    console.log({ name, description, price, quantity });
    try {
      const item = await addCard({ name, description, price });
      router.push("/buy");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="p-4">
        <div className="w-full h-fit bg-white border p-4 rounded-lg shadow-lg mb-4">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-2">
              <Heading>General Information</Heading>
              <SemiHeading>Product Name</SemiHeading>
              <ProductInputBox setValue={setName} />
              <SemiHeading>Description</SemiHeading>
              <DescriptionBox setValue={setDescription} />
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-white border p-4 rounded-lg shadow-lg mb-4">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-2">
              <Heading>Pricing</Heading>
              <SemiHeading>Best Price</SemiHeading>
              <PriceInputBox setValue={setPrice} />
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-white border p-4 rounded-lg shadow-lg mb-4">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-2">
              <Heading>Inventory</Heading>
              <SemiHeading>Quantity</SemiHeading>
              <QuantityInputBox setValue={setQuantity} />
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-white border p-4 rounded-lg shadow-lg mb-4">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-2">
              <Heading>Image</Heading>
              <SemiHeading>Product Image</SemiHeading>
              <input type="file" accept="image/*" name="file" onChange={imageInput}></input>
            </div>
          </div>
        </div>
        <AddButton onClick={handleAddItem} />
      </div>
    </>
  );
}
