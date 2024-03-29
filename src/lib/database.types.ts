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
      account: {
        Row: {
          color: string
          firstname: string | null
          id: string
          initialized: boolean
          lastname: string | null
          nickname: string | null
          role: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          color?: string
          firstname?: string | null
          id: string
          initialized?: boolean
          lastname?: string | null
          nickname?: string | null
          role?: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          color?: string
          firstname?: string | null
          id?: string
          initialized?: boolean
          lastname?: string | null
          nickname?: string | null
          role?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: [
          {
            foreignKeyName: "account_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      agendaItems: {
        Row: {
          created_at: string
          detail: string | null
          discussed: boolean
          id: number
          meeting_id: number | null
          title: string
        }
        Insert: {
          created_at?: string
          detail?: string | null
          discussed?: boolean
          id?: number
          meeting_id?: number | null
          title: string
        }
        Update: {
          created_at?: string
          detail?: string | null
          discussed?: boolean
          id?: number
          meeting_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agendaItems_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          }
        ]
      }
      boards: {
        Row: {
          id: number
          inserted_at: string
          position: number
          title: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          position?: number
          title?: string | null
          user_id?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          position?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cards: {
        Row: {
          completed_at: string | null
          description: string | null
          id: number
          inserted_at: string
          list_id: number
          position: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          description?: string | null
          id?: number
          inserted_at?: string
          list_id: number
          position?: number
          user_id?: string
        }
        Update: {
          completed_at?: string | null
          description?: string | null
          id?: number
          inserted_at?: string
          list_id?: number
          position?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          color: string
          description: string | null
          id: number
          title: string
        }
        Insert: {
          color?: string
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          color?: string
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      lists: {
        Row: {
          board_id: number
          id: number
          inserted_at: string
          position: number
          title: string | null
          user_id: string
        }
        Insert: {
          board_id: number
          id?: number
          inserted_at?: string
          position?: number
          title?: string | null
          user_id?: string
        }
        Update: {
          board_id?: number
          id?: number
          inserted_at?: string
          position?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lists_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "boards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      meetings: {
        Row: {
          created_at: string
          end_time: string | null
          held: boolean
          id: number
          location: string
          start_time: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          held?: boolean
          id?: number
          location?: string
          start_time?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          held?: boolean
          id?: number
          location?: string
          start_time?: string | null
          title?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          account_id: string
          group_id: number
        }
        Insert: {
          account_id: string
          group_id: number
        }
        Update: {
          account_id?: string
          group_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "members_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
      protocols: {
        Row: {
          content: string | null
          created_at: string
          creator_id: string | null
          id: number
          meeting_id: number | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          creator_id?: string | null
          id?: number
          meeting_id?: number | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          creator_id?: string | null
          id?: number
          meeting_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocols_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocols_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      sort_board: {
        Args: {
          board_id: number
          list_ids: number[]
        }
        Returns: boolean
      }
      sort_list: {
        Args: {
          new_list_id: number
          card_ids: number[]
        }
        Returns: boolean
      }
    }
    Enums: {
      account_type: "ADMIN" | "MEMBER" | "UNKNOWN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
