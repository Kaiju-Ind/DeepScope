import type { TechnologyDefinition } from '@/lib/detection/types';

export const quillTechnologyDefinition: TechnologyDefinition = {
	id: 'quill',
	name: 'Quill',
	website: 'https://quilljs.com',
	description: 'Quill is a free open-source WYSIWYG editor.',
	icon: 'Quill.svg',
	categories: [
		'rich-text-editors',
	],
	rules: [
		{
			id: 'quill:dom:0',
			kind: 'dom',
			selector: "div[class*='ql-editor'], div[class*='quill']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'quill:dom:1',
			kind: 'dom',
			selector: "link[href*='cdn.quilljs.com/']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'quill:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'Quill',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
