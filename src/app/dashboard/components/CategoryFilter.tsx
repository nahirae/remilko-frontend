"use client";

import { useEffect, useState } from "react";
import { getAllCategoriesFromRecipes } from "@/lib/category";
import { useSearchParams } from "next/navigation";

export default function CategoryFilter({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const allCategories = await getAllCategoriesFromRecipes();
      setCategories(allCategories);
    };

    const urlCategory = searchParams.get("category") || "";
    setSelectedValue(urlCategory);
    onSelectCategory(urlCategory);

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelectCategory(value);
  };

  return (
    <select
      className="p-2 border rounded"
      onChange={handleChange}
      value={selectedValue}
    >
      <option value="">Semua Kategori</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
