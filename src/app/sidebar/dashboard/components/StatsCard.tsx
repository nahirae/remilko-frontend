interface StatsCardProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 p-6 bg-[#F9F9E0] rounded-xl shadow-sm">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
