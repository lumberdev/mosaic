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
      submitted_tools: {
        Row: {
          created_at: string | null
          id: number
          is_added: boolean
          url: string
          user_email: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_added?: boolean
          url: string
          user_email?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_added?: boolean
          url?: string
          user_email?: string | null
        }
      }
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
