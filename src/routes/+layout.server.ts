import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);
	console.log('🚀 ~ file: +layout.server.ts:6 ~ constload:LayoutServerLoad= ~ session', session);
	return {
		session
	};
};
