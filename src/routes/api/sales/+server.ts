import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url, locals }) => {
	const supabase = locals.supabase;

	const from = new Date(url.searchParams.get('from') ?? "1970-01-01");
	const to = new Date(url.searchParams.get('to') ?? '9999-12-31');
	console.log(from, to);

	const { data: sales, error: supabaseError } = await supabase.from("sales")
		.select("*, sale_items(item_id, amount, price_per_item)")
		.gte('created_at', from.toISOString())
		.lte('created_at', to.toISOString());


	if (supabaseError) error(400, supabaseError.message);

	return json(sales);
};