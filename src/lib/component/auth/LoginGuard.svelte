<script lang="ts">
	import {session} from "$lib/supabase"
</script>

{#if $session.user}
	<slot name="loggedIn" />
{:else}
	<slot name="loggedOff" />
{/if}
