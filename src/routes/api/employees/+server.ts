import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url, locals }) => {
	const supabase = locals.supabase;



	const { data: items, error: supabaseError } = await supabase.from("employees")
		.select("*");


	if (supabaseError) error(400, supabaseError.message);

	return json(items);
};