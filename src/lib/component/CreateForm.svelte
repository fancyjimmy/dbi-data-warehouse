<script>
	import { createEventDispatcher } from 'svelte';

	export let action = 'Add';

	const dispatch = createEventDispatcher();
	function submit() {
		dispatch('submit');
    hidden = true;
	}

	function close() {
		hidden = true;
	}

	let hidden = true;
</script>

{#if hidden}
	<button
		on:click={() => {
			hidden = !hidden;
		}}
		class={$$props.class}
	>
		{action}
	</button>
{:else}
	<form on:submit|preventDefault={submit} class="flex flex-col gap-2 {$$props.formClass}">
		<div>
			<slot name="form" />
		</div>

		<div class="flex gap-2 items-center justify-between">
			<button class="p-1 bg-primary-500 border-simple flex-auto font-body text-white" type="submit"
				>{action}</button
			>
			<button class="p-1" type="button" on:click={close}>
				<svg
					height="20"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</form>
{/if}
