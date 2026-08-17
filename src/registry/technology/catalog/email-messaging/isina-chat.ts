import type { TechnologyDefinition } from '@/lib/detection/types';

export const isinaChatTechnologyDefinition: TechnologyDefinition = {
	id: 'isina-chat',
	name: 'iSina Chat',
	website: 'https://isina.agency',
	description: 'iSina Chat is a live chat service that provides online support and FAQ for customers.',
	icon: 'iSina Chat.svg',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'isina-chat:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('chat\\.isina\\.agency\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
