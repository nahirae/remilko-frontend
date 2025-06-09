import Image from "next/image";

interface RecipeCardProps {
  title: string;
  image: string;
}

export default function RecipeCard({ title, image }: RecipeCardProps) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
      <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-4">
        <h4 className="text-base font-semibold">{title}</h4>
        <button className="mt-2 text-xs bg-[#839ED1] text-white px-3 py-1 rounded-full hover:bg-[#6b89c1]">
          Rekomendasikan
        </button>
      </div>
    </div>
  );
}
