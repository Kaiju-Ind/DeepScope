import type { TechnologyDefinition } from '@/lib/detection/types';

export const addthisTechnologyDefinition: TechnologyDefinition = {
	id: 'addthis',
	name: 'AddThis',
	website: 'https://www.addthis.com',
	description:
		'AddThis is a social bookmarking service that can be integrated into a website with the use of a web widget.',
	icon: 'AddThis.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'addthis:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('addthis\\.com\\/js\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'addthis:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'addthis',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
