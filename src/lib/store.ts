import { writable } from 'svelte/store';

export function serializable<T>(name: string, defaultValue: T, storage: Storage = localStorage) {
	const stored = storage.getItem(name);
	if (stored) {
		defaultValue = JSON.parse(stored);
	}

	const { subscribe, set, update } = writable<T>(defaultValue);

	subscribe((value) => {
		if (value !== null) {
			storage.setItem(name, JSON.stringify(value));
		} else {
			storage.removeItem(name);
		}
	});

	return {
		subscribe,
		set,
		update
	};
}
