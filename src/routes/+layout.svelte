<script lang="ts">
	import '../app.pcss';

	import { session, supabase, user } from '$lib/supabase';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import Logo from '$lib/component/Logo.svelte';
	import type { Link } from '$lib/types';
	import Avatar from '$lib/component/Avatar.svelte';

	export let data;

	$: $supabase = data.supabase;
	$: $session = data.session;
	$: $user = data.session?.user;

	onMount(() => {
		const {
			data: { subscription }
		} = $supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth');
			}

			$session = _session;
		});

		return () => subscription.unsubscribe();
	});

	const links: Link[] = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'buy',
			href: '/buy',
			loggedIn: true
		},
		{
			name: 'About',
			href: '/about'
		}
	];
	let showDrawer = false;
	function toggleDrawer() {
		showDrawer = !showDrawer;
	}
</script>

<svelte:head>
	<title>Data Warehouse</title>
</svelte:head>

{#if showDrawer}
	<div
		class="lg:hidden screen-height w-[75vw] fixed right-0 top-0 bottom-0 bg-secondary-400 border-l-4 border-black m-auto p-2 z-50"
	>
		<button on:click={toggleDrawer}>
			<svg
				class="w-6 h-6 text-black dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
				/>
			</svg>
		</button>
		<div class=" p-2 flex flex-col gap-3">
			{#each links as link}
				{#if (link.loggedIn && $user) || !link.loggedIn}
					<a
						on:click={() => {
							toggleDrawer();
						}}
						class="p-3 block border-3d bg-primary-200 hover:bg-primary-100 duration-200 uppercase font-body"
						href={link.href}>{link.name}</a
					>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<div class="flex w-screen h-screen flex-col">
	<nav class="bg-primary-400 border-b-2 border-black flex justify-between items-center p-2">
		<a href="/">
			Home
		</a>
		<ul class="gap-3 hidden md:flex">
			{#each links as link}
				{#if (link.loggedIn && $user) || !link.loggedIn}
					<li
						class="border-3d bg-primary-200 hover:bg-primary-100 duration-200 p-1 uppercase font-body"
					>
						<a href={link.href}>{link.name}</a>
					</li>
				{/if}
			{/each}
		</ul>
		<div class="flex gap-2 px-2.5">
			<button class="block md:hidden border-3d p-2 bg-white" on:click={toggleDrawer}>
				<svg
					class="w-6 h-6"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
			{#if $user}
				<Avatar id="user-drop" class="cursor-pointer w-12 h-12"
					>{$user.user_metadata.name?.charAt(0)?.toUpperCase() ?? 'A'}</Avatar
				>
				<Dropdown triggeredBy="#user-drop" class="w-60 font-body border-3d">
					<DropdownHeader>
						<span class="block text-sm">{$user.user_metadata.name}</span>
						<span class="block truncate text-sm font-medium">{$user.email}</span>
					</DropdownHeader>
					<DropdownItem href="/your/groups">Gruppen</DropdownItem>
					<DropdownDivider />
					<DropdownItem
						on:click={async () => {
							await $supabase.auth.signOut();
							await goto('/login');
						}}>Sign out</DropdownItem
					>
				</Dropdown>
			{:else}
				<a
					href="/login"
					class="font-bold border-simple bg-secondary-400 active:shadow-none hover:-mt-0.5 hover:border-3d duration-100 p-1"
					>Login</a
				>
			{/if}
		</div>
	</nav>
	<div class="flex-auto relative">
		<div class="absolute inset-0 m-0 overflow-y-auto">
			<slot />
		</div>
	</div>
</div>

<style>
	.screen-height {
		height: 100vh;
		height: 100svh;
	}
</style>
