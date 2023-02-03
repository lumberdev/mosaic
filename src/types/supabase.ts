export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			tools: {
				Row: {
					created_at: string | null;
					description: string | null;
					id: number;
					image: string | null;
					tags: string[] | null;
					title: string | null;
					url: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					id?: number;
					image?: string | null;
					tags?: string[] | null;
					title?: string | null;
					url?: string | null;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					id?: number;
					image?: string | null;
					tags?: string[] | null;
					title?: string | null;
					url?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
