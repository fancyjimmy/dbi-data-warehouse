<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let email;
	let password;
	const handleSignIn = async () => {
		const response = await $supabase.auth.signInWithPassword({
			email,
			password
		});

		if (response.error) {
		} else {
			await goto('/');
		}
	};
</script>

<div class="flex overflow-hidden w-full h-full divide-x-2 divide-black">
	<div
		class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="w-full max-w-xl mx-auto lg:w-96">
			<div>
				<h2 class="mt-6 text-secondary-500 font-heading text-3xl">Log in.</h2>
			</div>

			<div class="mt-8">
				<form class="flex flex-col gap-3" on:submit|preventDefault={() => handleSignIn()}>
					<label for="email" class="font-heading text-sm">Email address</label>
					<input
						bind:value={email}
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="Your Email"
						class="border-3d"
					/>

					<label for="password" class="font-heading text-sm">Password</label>
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						placeholder="Your Password"
						class="border-3d w-full"
					/>

					<div class="flex items-center justify-between font-body">
						<div>
							<a href="/" class="font-medium text-primary-600 hover:text-primary-500">
								Passwort vergessen?🚧
							</a>
						</div>

						<div>
							<a href="/register" class="font-medium text-primary-600 hover:text-primary-500">
								Registrieren?
							</a>
						</div>
					</div>

					<button
						type="submit"
						class="px-10 py-4 text-base font-medium text-center text-white border-3d bg-primary-500 hover:bg-primary-600"
						>Log in</button
					>
				</form>
			</div>
		</div>
	</div>
	<div class="relative flex-1 hidden w-0 overflow-hidden lg:block">
		<img class="absolute inset-0 object-cover w-full h-full" src="/placeholder/login.jpg" alt="" />
	</div>
</div>
