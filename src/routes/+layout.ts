/**
 * Universal load function, called on both the client and the server.
 */
import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutLoad = async (event) => {
	const { session } = await getSupabase(event);
	console.log('🚀 ~ file: +layout.ts:9 ~ constload:LayoutLoad= ~ session', session);
	return { session };
};
