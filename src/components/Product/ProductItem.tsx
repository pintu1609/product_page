import React from "react";
import Image from "next/image";

interface ProductProps {
  product: {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div key={product.id} className="border p-4 rounded-lg">
      <Image src={product.image} alt={product.title} width={150} height={150} className="w-full h-64" />
      <h2 className="text-lg font-bold mt-2">{product.title}</h2>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
