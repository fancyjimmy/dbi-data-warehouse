<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor, EditorContent, BubbleMenu, createEditor, FloatingMenu } from 'svelte-tiptap';

	import { Extension } from '@tiptap/core';
	import { TextAlign } from '@tiptap/extension-text-align';
	import { Underline } from '@tiptap/extension-underline';
	import { getHandlePaste } from '$lib/component/protocol/utils';
	import TagSelector from '$lib/component/protocol/TagSelector.svelte';
	import TextFormatting from '$lib/component/protocol/TextFormatting.svelte';

	let editor: Readable<Editor>;
	type Level = 1 | 2 | 3 | 4 | 5 | 6;
	export let startContent = '';
	export let value = '';

	const CustomExtension = Extension.create({
		addKeyboardShortcuts() {
			return {
				'Mod-s': () => {
					save();
					return true;
				}
			};
		}
	});
	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit, CustomExtension, TextAlign, Underline],
			content: startContent,
			editorProps: {
				attributes: {
					class: 'p-3 outline-none',
					spellcheck: false
				}
			},
			onUpdate() {
				value = $editor.getHTML();
			}
		});

		$editor.setOptions({
			editorProps: {
				handlePaste: getHandlePaste($editor, (image) => {
					$editor.commands.insertContent(`<img src='${image}'></img>`);
				})
			}
		});
	});
	const toggleHeading = (level: Level) => {
		return () => {
			$editor.chain().focus().toggleHeading({ level }).run();
		};
	};

	const toggleOrderedList = () => $editor.chain().focus().toggleOrderedList().run();
	const toggleUnorderedList = () => $editor.chain().focus().toggleBulletList().run();
	const toggleBold = () => $editor.chain().focus().toggleBold().run();
	const toggleItalic = () => $editor.chain().focus().toggleItalic().run();
	const toggleUnderline = () => $editor.chain().focus().toggleUnderline().run();
	const toggleStrike = () => $editor.chain().focus().toggleStrike().run();
	const toggleCode = () => $editor.chain().focus().toggleCode().run();
	const alignLeft = () => $editor.chain().focus().setTextAlign('left').run();
	const alignCenter = () => $editor.chain().focus().setTextAlign('center').run();
	const alignRight = () => $editor.chain().focus().setTextAlign('right').run();
	const unsetAlignment = () => $editor.chain().focus().setTextAlign(null).run();

	const toggleText = {
		toggleBold,
		toggleItalic,
		toggleUnderline,
		toggleStrike,
		toggleCode,
		toggleOrderedList,
		toggleUnorderedList,
		alignLeft,
		alignCenter,
		alignRight,
		unsetAlignment
	};

	const setParagraph = () => $editor.chain().focus().setParagraph().run();

	const dispatch = createEventDispatcher();
	function save() {
		dispatch('save', $editor.getHTML());
	}

	$: activeMap = {
		'Heading 1': () => isActive('heading', { level: 1 }),
		'Heading 2': () => isActive('heading', { level: 2 }),
		'Heading 3': () => isActive('heading', { level: 3 }),
		'Heading 4': () => isActive('heading', { level: 4 }),
		'Heading 5': () => isActive('heading', { level: 5 }),
		'Heading 6': () => isActive('heading', { level: 6 }),
		Paragraph: () => isActive('paragraph')
	};

	$: activationMap = {
		'Heading 1': toggleHeading(1),
		'Heading 2': toggleHeading(2),
		'Heading 3': toggleHeading(3),
		'Heading 4': toggleHeading(4),
		'Heading 5': toggleHeading(5),
		'Heading 6': toggleHeading(6),
		Paragraph: setParagraph
	};

	$: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);

	// load protocol.
</script>

<div class="grid-rows-[auto_1fr] grid h-full">
	{#if editor}
		<div class="p-3 flex gap-3 top-3 bg-primary-600 z-10">
			<TagSelector
				value={Object.keys(activeMap).filter((tag) => activeMap[tag]())[0]}
				on:change={(event) => {
					const tag = event.detail;
					activationMap[tag]();
				}}
			/>
			<TextFormatting {toggleText} />
			<button class="bg-white border-3d font-body px-3" on:click={save}> Save </button>
			<slot />
		</div>
	{/if}
	<div class="relative">
		<div class="absolute inset-0 m-0 overflow-y-auto bg-primary-300 editor">
			<EditorContent editor={$editor} />
		</div>
	</div>
</div>

<style>
</style>
