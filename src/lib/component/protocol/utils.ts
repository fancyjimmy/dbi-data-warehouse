import type { Editor } from 'svelte-tiptap';

export function getHandlePaste(editor: Editor, imageUpload: (imageBase64: string) => void) {
	return (view: unknown, event: ClipboardEvent) => {
		const item = event.clipboardData?.items[0];

		if (item?.type.indexOf('image') !== 0) {
			return false;
		}

		const file = item.getAsFile()!;
		const filesize = parseInt((file.size / 1024 / 1024).toFixed(4));

		if (filesize > 10) {
			window.alert(`too large image! filesize: ${filesize} mb`);
			return false;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			imageUpload(String(e.target?.result));
		};

		return true;
	};
}

export const TAGS = {
	'Heading 1': 'h1',
	'Heading 2': 'h2',
	'Heading 3': 'h3',
	'Heading 4': 'h4',
	'Heading 5': 'h5',
	'Heading 6': 'h6',
	'Preformatted text': 'pre',
	Paragraph: 'p'
};

export type Tag = keyof typeof TAGS;
export function getValues(enumObj: Record<string, string>) {
	return Object.keys(enumObj).map((key) => enumObj[key]);
}

export function reverseEnum<T extends Record<string, string>>(enumObj: T) {
	const reversed: Record<string, string> = {};
	Object.keys(enumObj).forEach((key) => {
		reversed[enumObj[key]] = key;
	});
	return reversed as { [K in keyof T]: string };
}
export function getKeys(enumObj: Record<string, string>) {
	return Object.keys(enumObj);
}
