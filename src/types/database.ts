export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          stock_id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          fuel: string
          transmission: string
          color: string
          main_image: string | null
          gallery: string[] | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          stock_id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          fuel: string
          transmission: string
          color: string
          main_image?: string | null
          gallery?: string[] | null
          featured?: boolean
        }
        Update: {
          id?: string
          stock_id?: string
          make?: string
          model?: string
          year?: number
          price?: number
          mileage?: number
          fuel?: string
          transmission?: string
          color?: string
          main_image?: string | null
          gallery?: string[] | null
          featured?: boolean
        }
      }
    }
  }
}