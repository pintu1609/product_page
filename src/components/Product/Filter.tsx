import React from "react";

interface FilterProps {
  filters: { category: string; price: string; sort: string };
  onFilterChange: (key: string, value: string) => void;
}

const ProductFilters: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
      <select
        className="border p-2 w-full sm:w-auto"
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
        <option value="men's clothing">Men&apos;s Clothing</option>
        <option value="women's clothing">Women&apos;s Clothing</option>
      </select>

      <select
        className="border p-2 w-full sm:w-auto"
        value={filters.price}
        onChange={(e) => onFilterChange("price", e.target.value)}
      >
        <option value="">All Prices</option>
        <option value="0-50">0 - 50</option>
        <option value="50-100">50 - 100</option>
        <option value="100-500">100 - 500</option>
      </select>

      <select
        className="border p-2 w-full sm:w-auto"
        value={filters.sort}
        onChange={(e) => onFilterChange("sort", e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
