"use client"; // Mark as Client Component

import { useState, useEffect } from "react";
import { useProduct } from "@/hooks/product";
import ProductFilters from "@/components/Product/Filter";
import ProductCard from "@/components/Product/ProductItem";
import Pagination from "@/components/Product/Pagination";
import ClipLoader from "react-spinners/ClipLoader";


export default function Home() {
  const [filters, setFilters] = useState({ category: "", price: "", sort: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const productsPerPage = 6;

  useEffect(() => {
    if (data) {
      let tempProducts = [...data];

      // Apply category filter
      if (filters.category) {
        tempProducts = tempProducts.filter((product) => product.category === filters.category);
      }

      // Apply price filter
      if (filters.price) {
        const [minPrice, maxPrice] = filters.price.split("-").map(Number);
        tempProducts = tempProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
      }

      // Apply sorting
      if (filters.sort === "asc") {
        tempProducts.sort((a, b) => a.price - b.price);
      } else if (filters.sort === "desc") {
        tempProducts.sort((a, b) => b.price - a.price);
      }

      // Apply search filter only for larger screens
      if (typeof window !== "undefined" && window.innerWidth >= 640 && search) {
        tempProducts = tempProducts.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setFilteredProducts(tempProducts);
      setPage(1); // Reset to first page when filters/search change
    }
  }, [data, filters, search]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Product Listing</h1>

      {/* Filters & Search Box (Search Hidden on Mobile) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
        
        {/* Search Box (Hidden on Mobile) */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-64 hidden sm:block"
        />
      </div>

      {/* Product Grid */}
      {isLoading ?
        <div className="flex justify-center items-center">

          <ClipLoader
          // color="#36d7b7"
          size={150}
 
        />
        </div>:
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product: any) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center text-gray-500 col-span-3">No products found.</p>
        )}
      </div>
}

      {/* Pagination (Only show if there are multiple pages) */}
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}
