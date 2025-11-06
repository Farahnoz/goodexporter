import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: featured } = await supabase
    .from('cars')
    .select('id, stock_id, make, model, year, price, main_image')
    .eq('featured', true)
    .limit(6);

  const { data: latest } = await supabase
    .from('cars')
    .select('id, stock_id, make, model, year, price, main_image')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-b from-black to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-neon mb-6">EXPORT QUALITY CARS</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Japanese & Korean Used Cars — Full Export Processing — Door to Door Worldwide</p>
            <a href="/inventory" className="inline-block bg-neon text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition">BROWSE INVENTORY</a>
          </div>
        </section>

        {featured?.length ? (
          <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-neon text-center mb-10">FEATURED CARS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map(car => <CarCard key={car.id} car={car} />)}
              </div>
            </div>
          </section>
        ) : null}

        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-neon text-center mb-10">LATEST ARRIVALS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latest?.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}