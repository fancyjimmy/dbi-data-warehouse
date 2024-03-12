import { describe, it, expect } from 'vitest';
import { getSupabaseClient } from '$lib/test-utils';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		console.log(getSupabaseClient());
		expect(1 + 2).toBe(3);
	});
});
