<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { Tag } from '$lib/component/protocol/utils';
	import { getKeys, TAGS } from '$lib/component/protocol/utils';

	export let value: Tag;

	let selecting = false;

	const dispatch = createEventDispatcher();
	function toggleSelect() {
		selecting = !selecting;
	}

	function select(tag: Tag) {
		value = tag;
		selecting = false;
		dispatch('change', value);
	}
	$: disabled = value === undefined;
</script>

<div class="relative w-48 py-1 rounded font-body text-gray-800 bg-gray-100 border-simple">
	<button
		{disabled}
		on:click={toggleSelect}
		class="w-full flex justify-between h-full items-center px-2 font-bold"
	>
		<span>
			{value ?? '-'}
		</span>
		<div class="w-2 h-2">
			{#if selecting}
				<svg
					class=" text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 8"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
					/>
				</svg>
			{:else}
				<svg
					class=" text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 8"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
					/>
				</svg>
			{/if}
		</div>
	</button>
	{#if selecting}
		<div
			class="flex flex-col absolute mt-2 bg-white overflow-hidden rounded z-10 w-full justify-start border-simple divide-y-2 divide-black"
			transition:fade={{
				duration: 100,
				easing: cubicOut
			}}
		>
			{#each getKeys(TAGS) as tag (tag)}
				<button
					on:click={() => {
						if (tag !== value) select(tag);
					}}
					class="text-start py-1 px-2 w-full hover:text-sky-500 hover:bg-sky-100 duration-200"
				>
					{tag}
				</button>
			{/each}
		</div>
	{/if}
</div>
