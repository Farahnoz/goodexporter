import Link from 'next/link';

export default function CarCard({ car }: { car: any }) {
  return (
    <Link href={`/inventory/${car.stock_id}`} className="block group">
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-neon/20 hover:border-neon transition">
        {car.main_image ? (
          <img
            src={car.main_image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="bg-gray-700 h-48" />
        )}
        <div className="p-5">
          <h3 className="font-bold text-lg text-white group-hover:text-neon transition">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="text-2xl font-black text-neon mt-2">
            ${car.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">Stock: {car.stock_id}</p>
        </div>
      </div>
    </Link>
  );
}