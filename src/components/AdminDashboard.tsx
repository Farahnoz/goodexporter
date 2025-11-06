'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Car = {
  id?: number;
  stock_id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  main_image: string;
  featured: boolean;
};

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [formData, setFormData] = useState<Car>({
    stock_id: '',
    make: '',
    model: '',
    year: 0,
    price: 0,
    mileage: 0,
    fuel: '',
    transmission: '',
    color: '',
    main_image: '',
    featured: false,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const ADMIN_PASSWORD = 'goodexporter123';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*');
    // THIS LINE IS THE ONLY ONE THAT MATTERS – 100% FIX
    setCars((data ?? []) as Car[]);
  };

  useEffect(() => {
    if (authenticated) fetchCars();
  }, [authenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await supabase.from('cars').update(formData).eq('id', editId);
      } else {
        await supabase.from('cars').insert(formData);
      }
      fetchCars();
      setFormData({
        stock_id: '', make: '', model: '', year: 0, price: 0, mileage: 0,
        fuel: '', transmission: '', color: '', main_image: '', featured: false,
      });
      setEditId(null);
    } catch (err) {
      alert('Error saving car');
    }
  };

  const handleEdit = (car: Car) => {
    setFormData(car);
    setEditId(car.id ?? null);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this car permanently?')) {
      await supabase.from('cars').delete().eq('id', id);
      fetchCars();
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        $<$div className="bg-gray-900 p-8 rounded-xl border border-neon/20 max-w-md w-full">
          <h1 className="text-3xl font-black text-neon text-center mb-6">ADMIN LOGIN</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full p-3 bg-black border border-neon/50 rounded text-white"
              required
            />
            <button type="submit" className="w-full bg-neon text-black py-3 rounded font-bold hover:bg-white transition">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-neon">ADMIN DASHBOARD</h1>
        <button
          onClick={() => setAuthenticated(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl mb-8 space-y-4 border border-neon/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={formData.stock_id} onChange={(e) => setFormData({ ...formData, stock_id: e.target.value })} placeholder="Stock ID" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.make} onChange={(e) => setFormData({ ...formData, make: e.target.value })} placeholder="Make" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="Model" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input type="number" value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) || 0 })} placeholder="Year" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input type="number" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })} placeholder="Price" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input type="number" value={formData.mileage || ''} onChange={(e) => setFormData({ ...formData, mileage: Number(e.target.value) || 0 })} placeholder="Mileage (km)" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.fuel} onChange={(e) => setFormData({ ...formData, fuel: e.target.value })} placeholder="Fuel" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.transmission} onChange={(e) => setFormData({ ...formData, transmission: e.target.value })} placeholder="Transmission" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.color} onChange={(e) => setFormData ( ...formData, color: e.target.value })} placeholder="Color" className="p-3 bg-black border border-neon/50 rounded text-white" required />
          <input value={formData.main_image} onChange={(e) => setFormData({ ...formData, main_image: e.target.value })} placeholder="Main Image URL" className="p-3 bg-black border border-neon/50 rounded text-white" required />
        </div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5" />
          <span className="text-white">Featured</span>
        </label>
        <button type="submit" className="bg-neon text-black px-8 py-3 rounded-full font-bold hover:bg-white transition">
          {editId ? 'Update Car' : 'Add Car'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-gray-900 p-4 rounded-xl border border-neon/20 flex flex-col">
            {car.main_image ? (
              <img src={car.main_image} alt={`${car.make} ${car.model}`} className="w-full h-40 object-cover rounded mb-3" />
            ) : (
              <div className="bg-gray-800 h-40 rounded mb-3 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <h3 className="font-bold text-neon">{car.year} {car.make} {car.model}</h3>
            <p className="text-green-400">${car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Stock: {car.stock_id}</p>
            {car.featured && <span className="text-xs text-yellow-400 font-bold">FEATURED</span>}
            <div className="flex space-x-2 mt-4">
              <button onClick={() => handleEdit(car)} className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">Edit</button>
              <button onClick={() => handleDelete(car.id!)} className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {cars.length === 0 && <p className="text-center text-gray-400 py-10">No cars yet – add one!</p>}
    </div>
  );
}