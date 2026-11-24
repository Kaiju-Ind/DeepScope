import type { TechnologyDefinition } from '@/lib/detection/types';

export const humanPresenceTechnologyDefinition: TechnologyDefinition = {
	id: 'human-presence',
	name: 'Human Presence',
	website: 'https://www.humanpresence.io',
	description: 'Human Presence is a bot detection and spam protection software for WordPress and Shopify.',
	icon: 'human_presence.svg',
	categories: [
		'security',
	],
	rules: [
		{
			id: 'human-presence:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('^https?:\\/\\/(?:[A-Za-z0-9-]+\\.)*humanpresence\\.(?:io|app)(?::\\d{1,5})?\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
