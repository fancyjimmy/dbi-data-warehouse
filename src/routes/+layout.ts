// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import SupabaseDatabase from '$lib/supabase/db';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	//
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();


	const db = new SupabaseDatabase(supabase, (error) => {
		throw error;
	});

	return { supabase, session, db };
};
