import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';

export const dynamic = 'force-dynamic';

export default async function InventoryPage({ searchParams }: any) {
  const make = searchParams.make || '';
  const minYear = searchParams.minYear ? Number(searchParams.minYear) : 0;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : 999999;

  let query = supabase
    .from('cars')
    .select('id, stock_id, make, model, year, price, main_image')
    .order('created_at', { ascending: false });

  if (make) query = query.eq('make', make);
  if (minYear) query = query.gte('year', minYear);
  if (maxPrice) query = query.lte('price', maxPrice);

  const { data: cars } = await query;

  const { data: makes } = await supabase.from('cars').select('make').order('make');
  const uniqueMakes = Array.from(new Set(makes?.map(m => m.make)));

  return (
    <>
      <Header />
      <main className="bg-black min-h-screen">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl font-black text-neon text-center mb-12">INVENTORY</h1>

            <form className="bg-gray-900 p-6 rounded-xl border border-neon/20 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-neon font-bold text-sm">Make</label>
                  <select name="make" className="w-full mt-2 p-3 bg-black border border-neon/50 rounded-lg text-white" defaultValue={make}>
                    <option value="">All Makes</option>
                    {uniqueMakes.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-neon font-bold text-sm">Min Year</label>
                  <input type="number" name="minYear" placeholder="2010" defaultValue={minYear || ''} className="w-full mt-2 p-3 bg-black border border-neon/50 rounded-lg text-white" />
                </div>
                <div>
                  <label className="text-neon font-bold text-sm">Max Price (USD)</label>
                  <input type="number" name="maxPrice" placeholder="50000" defaultValue={maxPrice < 999999 ? maxPrice : ''} className="w-full mt-2 p-3 bg-black border border-neon/50 rounded-lg text-white" />
                </div>
              </div>
              <button type="submit" className="mt-6 bg-neon text-black px-8 py-3 rounded-full font-bold hover:bg-white transition">Apply Filters</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {cars?.map(car => <CarCard key={car.id} car={car} />)}
            </div>
            {!cars?.length && <p className="text-center text-gray-400 py-20">No cars found. Try adjusting filters.</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}