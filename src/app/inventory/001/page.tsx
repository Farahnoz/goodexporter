import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CarPage({ params }: { params: { stock_id: string } }) {
  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('stock_id', params.stock_id)
    .single();

  if (!car) {
    return (
      <>
        <Header />
        <main className="py-20 text-center bg-black">
          <h1 className="text-3xl text-neon">Car Not Found</h1>
          <Link href="/inventory" className="text-neon underline">← Back to Inventory</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/inventory" className="text-neon hover:underline mb-8 inline-block">← Back to Inventory</Link>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <img src={car.main_image} alt={`${car.make} ${car.model}`} className="w-full rounded-xl border border-neon/30" />
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-neon/20">
              <h1 className="text-4xl font-black text-neon">{car.year} {car.make} {car.model}</h1>
              <p className="text-5xl font-black text-white mt-4">${car.price.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-2">Stock ID: {car.stock_id}</p>
              <div className="mt-8 space-y-4 text-white">
                <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} km</p>
                <p><strong>Fuel:</strong> {car.fuel}</p>
                <p><strong>Transmission:</strong> {car.transmission}</p>
                <p><strong>Color:</strong> {car.color}</p>
              </div>
              <a href="/contact" className="mt-10 block text-center bg-neon text-black py-4 rounded-full font-bold text-lg hover:bg-white transition">INQUIRE NOW</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}