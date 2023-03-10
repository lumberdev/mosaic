// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Supabase {
			Database: import('./DatabaseDefinitions').Database;
			SchemaName: 'public';
		}
		// interface Error {}
		// interface Locals {}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
