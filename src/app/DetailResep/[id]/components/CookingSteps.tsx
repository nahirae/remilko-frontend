"use client";

import { useState } from "react";

interface Ingredient {
  id: string;
  ingredient_name: string;
  ingredient_amount: string;
  ingredient_unit: string;
}
interface Tool {
  id: string;
  tool_name: string;
}
interface Step {
  id: string;
  step_number: number;
  step_description: string;
}

interface CookingStepsProps {
  ingredients: Ingredient[];
  tools: Tool[];
  steps: Step[];
}

export default function CookingSteps({ ingredients, tools, steps }: CookingStepsProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="rounded-xl bg-blue-50 p-7 mt-8 border border-blue-100">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-1/3">

          <h2 className="font-bold text-xl mb-4 text-gray-800">Alat & Bahan</h2>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-gray-700">Alat - alat:</h3>
            <div className="space-y-2">
              {tools && tools.length > 0 ? (
                tools.map((tool) => (
                  <label key={tool.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      onChange={() => toggleCheck(tool.id)} 
                      checked={checkedItems.has(tool.id)} 
                      className="form-checkbox rounded-full h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-400"
                    />
                    <span className={`transition-colors group-hover:text-blue-800 ${checkedItems.has(tool.id) ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {tool.tool_name}
                    </span>
                  </label>
                ))
              ) : <p className="text-sm text-gray-500 italic">Tidak ada data alat.</p>}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-700">Bahan - bahan:</h3>
            <div className="space-y-2">
              {ingredients && ingredients.length > 0 ? (
                ingredients.map((ing) => (
                  <label key={ing.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      onChange={() => toggleCheck(ing.id)} 
                      checked={checkedItems.has(ing.id)} 
                      className="form-checkbox rounded-full h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-400"
                    />
                    <span className={`transition-colors group-hover:text-blue-800 ${checkedItems.has(ing.id) ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {ing.ingredient_name} ({ing.ingredient_amount} {ing.ingredient_unit})
                    </span>
                  </label>
                ))
              ) : <p className="text-sm text-gray-500 italic">Tidak ada data bahan.</p>}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:border-l lg:pl-8 border-gray-300/60">
           <h2 className="font-bold text-xl mb-4 text-gray-800">Instruksi Memasak:</h2>
            <ol className="space-y-6 text-gray-800">
              {steps && steps.length > 0 ? (
                steps.map((step) => (
                  <li key={step.id} className="flex items-start gap-4">
                    <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-base font-bold ring-4 ring-blue-200">
                      {step.step_number}
                    </div>
                    <p className="pt-1 leading-relaxed">{step.step_description}</p>
                  </li>
                ))
              ) : <p className="text-sm text-gray-500 italic">Tidak ada instruksi memasak.</p>}
            </ol>
        </div>
      </div>
    </div>
  );
}