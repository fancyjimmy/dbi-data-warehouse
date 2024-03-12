// src/routes/+layout.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {

	const api = url.searchParams.get('path');
	if (api === null) return;

	const apiPath = new URL(url.origin + api);
	for (let entry of url.searchParams.entries()) {
		if (entry[0] === "path") continue;

		apiPath.searchParams.set(entry[0], entry[1]);
	}
	const result = await fetch(apiPath);
	const jsonResult = await result.json();

	return { result: jsonResult, apiPath};
};
