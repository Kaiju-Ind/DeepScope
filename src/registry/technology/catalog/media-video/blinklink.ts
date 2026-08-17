import type { TechnologyDefinition } from '@/lib/detection/types';

export const blinklinkTechnologyDefinition: TechnologyDefinition = {
	id: 'blinklink',
	name: 'Blinklink',
	website: 'https://blinklink.com',
	description: 'Blinklink is a platform that offers enterprises AI-curated short-form video solutions.',
	icon: 'Blinklink.svg',
	categories: [
		'media-video',
	],
	rules: [
		{
			id: 'blinklink:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.blinklink\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
