// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// THIS IS THE KEY: Add proper typing for queries
export type Database = {
  public: {
    Tables: {
      cars: {
        Row: {
          id: number;
          created_at: string;
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
        Insert: Omit<Database['public']['Tables']['cars']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['cars']['Insert']>;
      };
    };
  };
};