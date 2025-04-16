type Props = {
    title: string;
    image: string;
    user: string;
  };
  
  export default function RecipeCard({ title, image, user }: Props) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>30 Minutes</span>
            <span>Makan Siang</span>
            <span>210 Cals</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-medium">{user}</span>
            <button className="text-red-400 text-xl">♡</button>
          </div>
        </div>
      </div>
    );
  }
  