import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import type { Database, Tables } from '$lib/database.types';

export default class SupabaseDatabase {
	public items: ItemManager;
	public sales: SalesManager;
	constructor(
		private supabase: SupabaseClient<Database>,
		private errorCallback: (error: PostgrestError) => void
	) {

	}
}

export type BoardWithLists = Tables<'boards'> & {
	lists: Tables<'lists'>[];
};

export type FullBoard = Tables<'boards'> & {
	lists: ListWithCards[];
};
export type ListWithCards = Tables<'lists'> & {
	cards: Tables<'cards'>[];
};
export type MeetingWithAgendaItems = Tables<'meetings'> & {
	agendaItems: Omit<Tables<'agendaItems'>, 'meeting_id'>[];
};
