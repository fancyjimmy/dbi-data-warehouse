import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';



export function getEnv(key: string): string{
	return process.env[key] as string;
}
export function getSupabaseClient(): SupabaseClient{
	const supabase = createClient(
		getEnv('PUBLIC_SUPABASE_URL'),
		getEnv('PUBLIC_SUPABASE_ANON_KEY')
	);
	return supabase;
}

/*
// test description

export function asAccount(ACCOUNT.ADMIN).do((supabase) => {
	return supabase.from("test").select("*");
}).expect((result) => {
	return result === "test"
});

 */