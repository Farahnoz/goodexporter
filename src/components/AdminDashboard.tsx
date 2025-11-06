'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Car {
  id?: string;
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
  created_at?: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [cars, setCars] = useState<Car[]>([]); // ← FIXED TYPE
  const [formData, setFormData] = useState<Car>({
    stock_id: '',
    make: '',
    model: '',
    year: 2020,
    price: 0,
    mileage: 0,
    fuel: '',
    transmission: '',
    color: '',
    main_image: '',
    featured: false,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const ADMIN_PASSWORD = 'goodexporter123';

  useEffect(() => {
    if (authenticated) fetchCars();
  }, [authenticated]);

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*');
    setCars(data || []);
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('cars').update(formData).eq('id', editId);
    } else {
      await supabase.from('cars').insert(formData);
    }
    fetchCars();
    setFormData({
      stock_id: '', make: '', model: '', year: 2020, price: 0, mileage: 0,
      fuel: '', transmission: '', color: '', main_image: '', featured: false,
    });
    setEditId(null);
  };

  const handleEdit = (car: Car) => {
    setFormData(car);
    setEditId(car.id!);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('cars').delete().eq('id', id);
    fetchCars();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-10 rounded-xl border border-neon/20 w-96">
          <h1 className="text-4xl font-black text-neon text-center mb-8">ADMIN</h1>
          <form onSubmit={handlePassword}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 bg-black border border-neon/50 rounded text-white text-lg"
              required
            />
            <button className="w-full mt-6 bg-neon text-black py-4 rounded font-bold text-xl hover:bg-white transition">
              ENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black text-neon">ADMIN DASHBOARD</h1>
          <button onClick={() => setAuthenticated(false)} className="bg-red-600 px-6 py-3 rounded hover:bg-red-700">
            LOGOUT
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl border border-neon/20 mb-10">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {Object.keys(formData).map((key) => {
              if (key === 'featured') {
                return (
                  <label key={key} className="flex items-center col-span-2">
                    <input
                      type="checkbox"
                      checked={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                      className="w-6 h-6 mr-3"
                    />
                    <span className="text-xl">Featured Car</span>
                  </label>
                );
              }
              if (key === 'id' || key === 'created_at') return null;
              return (
                <input
                  key={key}
                  type={key.includes('year') || key.includes('price') || key.includes('mileage') ? 'number' : 'text'}
                  placeholder={key.replace(/_/g, ' ').toUpperCase()}
                  value={formData[key as keyof Car]}
                  onChange={(e) => setFormData({ ...formData, [key]: key.includes('year') || key.includes('price') || key.includes('mileage') ? Number(e.target.value) : e.target.value })}
                  className="p-4 bg-black border border-neon/50 rounded text-lg"
                  required
                />
              );
            })}
          </div>
          <button type="submit" className="bg-neon text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-white transition">
            {editId ? 'UPDATE CAR' : 'ADD CAR'}
          </button>
        </form>

        <div className="grid grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-gray-900 p-6 rounded-xl border border-neon/20">
              {car.main_image && <img src={car.main_image} alt="" className="w-full h-48 object-cover rounded mb-4" />}
              <h3 className="text-2xl font-bold text-neon">{car.year} {car.make} " {car.model}</h3>
              <p className="text-3xl text-green-400">${car.price.toLocaleString()}</p>
              <p className="text-gray-400">Stock: {car.stock_id}</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => handleEdit(car)} className="flex-1 bg-blue-600 py-3 rounded hover:bg-blue-700">EDIT</button>
                <button onClick={() => handleDelete(car.id!)} className="flex-1 bg-red-600 py-3 rounded hover:bg-red-700">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}