<script lang="ts">

	export let path = "/api/employees";
	export let data;
</script>

<form action="/api" method="get" class="font-body flex gap-3 p-3 flex-col">
	<p class="text-2xl">
	{data.apiPath ?? ""}
	</p>
	<div class="flex justify-between gap-2">

	<select name="path" class="w-full btn-3d-yellow" bind:value={path}>
		<option value="/api/employees" selected>Employees</option>
		<option value="/api/items">Items</option>
		<option value="/api/sales">Sales</option>
		<option value="/api/suppliers">Suppliers</option>
		<option value="/api/prices">Prices</option>
	</select>
	<button class="btn-3d-yellow px-4 p-2">Run</button>
	</div>

	{#if path === "/api/sales"}
		<div class="flex justify-between gap-2 pt-2">
		<input type="date" name="from">-<input type="date" name="to">
		</div>
	{/if}
</form>

<pre class="m-3 p-2 text-white bg-secondary-900">{JSON.stringify(data.result, null, 2)}</pre>
