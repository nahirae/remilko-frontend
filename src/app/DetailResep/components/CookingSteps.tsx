"use client"
import { useState } from "react"

interface Step {
  id: number
  step_number: number
  step_description: string
  photo_step?: string
}

interface CookingStepsProps {
  recipe: any
  steps: Step[]
  ingredients?: string[]
}

export default function CookingSteps({ recipe, steps, ingredients = [] }: CookingStepsProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [visibleStepCount, setVisibleStepCount] = useState(3) // cb nampilin 3 langkah dlu

  const utensils = [
    "Wajan", "Spatula", "Piring", "Talenan", "Pisau", "Sendok"
  ]

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const handleLoadMoreSteps = () => {
    setVisibleStepCount((prev) => prev + 3)
  }

  const visibleSteps = steps.slice(0, visibleStepCount)

  return (
    <div className="justify-between flex flex-col lg:flex-row pt-10">
      <div className="w-full rounded-xl bg-[#C9D7DD] ml-10 p-7 mr-7">
        <h2 className="font-bold text-lg mb-2">Alat - alat:</h2>
        <div className="grid grid-cols-2 gap-2">
          {utensils.map((item) => (
            <label key={item} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkedItems.includes(item)}
                onChange={() => toggleCheck(item)}
                className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-[#608BC1] checked:border-transparent transition duration-200"
              />
              <span className={`${checkedItems.includes(item) ? "line-through text-gray-400" : "text-gray-800"}`}>
                {item}
              </span>
            </label>
          ))}
        </div>

        <h2 className="font-bold text-lg mb-2 mt-6">Bahan - bahan:</h2>
        <div className="grid grid-cols-2 gap-2">
          {ingredients.length > 0 ? (
            ingredients.map((item) => (
              <label key={item} className="flex items-center space-x-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item)}
                  onChange={() => toggleCheck(item)}
                  className="appearance-none w-5 h-5 border border-gray-400 rounded-full checked:bg-[#608BC1] checked:border-transparent transition duration-200"
                />
                <span className={`${checkedItems.includes(item) ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {item}
                </span>
              </label>
            ))
          ) : (
            <p className="text-gray-600">Bahan tidak tersedia. Lihat deskripsi untuk detail.</p>
          )}
        </div>

        <h2 className="font-bold text-lg mb-4 mt-6">Instruksi Memasak:</h2>
        <ol className="space-y-6 text-gray-700">
          {visibleSteps && visibleSteps.length > 0 ? (
            visibleSteps.map((step) => (
              <li key={step.id} className="flex flex-col gap-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#608BC1] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    {step.step_number}
                  </div>
                  <span>{step.step_description}</span>
                </div>
                {step.photo_step && (
                  <img
                    src={step.photo_step}
                    alt={`Langkah ${step.step_number}`}
                    className="w-full max-w-md border border-gray-400 rounded-lg shadow"
                  />
                )}
              </li>
            ))
          ) : (
            <li>Instruksi tidak tersedia. Lihat deskripsi untuk detail.</li>
          )}
        </ol>

        {visibleStepCount < steps.length && (
          <div className="mt-5 text-center">
            <button
              onClick={handleLoadMoreSteps}
              className="bg-white border border-blue-900 px-5 py-2 rounded hover:bg-gray-100 text-sm"
            >
              Lihat lebih banyak langkah
            </button>
          </div>
        )}
      </div>

      <div className="w-xl mr-10 mt-10 lg:mt-0">
        <h2 className="font-bold text-xl mb-3">Resep Lain</h2>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex gap-3 mb-5">
            <img
              src={`/asset/img${index}.png`}
              alt={`food${index}`}
              className="h-24 rounded-xl"
            />
            <span>
              <p className="font-bold text-sm mb-3 mt-2">
                Bola - Bola Daging Ayam Krim Keju
              </p>
              <p className="text-sm text-gray-600">By Najwah Kamila</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
