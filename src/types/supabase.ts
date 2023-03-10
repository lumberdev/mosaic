export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tools: {
        Row: {
          created_at: string | null
          description: string | null
          featured_image: string | null
          id: number
          images: string[] | null
          name: string
          slug: string
          tags: string[] | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          id?: number
          images?: string[] | null
          name: string
          slug: string
          tags?: string[] | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          featured_image?: string | null
          id?: number
          images?: string[] | null
          name?: string
          slug?: string
          tags?: string[] | null
          url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
