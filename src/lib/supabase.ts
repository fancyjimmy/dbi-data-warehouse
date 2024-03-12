import { derived, writable } from 'svelte/store';
import type { PostgrestError, Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Account } from '$lib/supabase/auth';
import SupabaseDatabase from '$lib/supabase/db';

export const supabase = writable<SupabaseClient>();
export const db = derived(supabase, ($supabase) => {
	return new SupabaseDatabase($supabase, (error: PostgrestError) => {
		console.error(error.message);
	});
});
export const session = writable<Session | null>();

export const user = writable<User | undefined>();
