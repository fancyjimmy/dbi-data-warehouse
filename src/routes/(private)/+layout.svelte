<script lang="ts">
	import LoginGuard from '$lib/component/auth/LoginGuard.svelte';
</script>

<LoginGuard>
	<slot slot="loggedIn" />
  <h2 class="font-heading text-3xl" slot="loggedOff">Du musst eingeloggt sein!</h2>
</LoginGuard>
