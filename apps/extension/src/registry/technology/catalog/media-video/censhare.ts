import type { TechnologyDefinition } from '@/lib/detection/types';

export const censhareTechnologyDefinition: TechnologyDefinition = {
	id: 'censhare',
	name: 'Censhare',
	website: 'https://www.censhare.com',
	description:
		'Censhare is a commercial digital experience platform in the form of an enterprise content management system.',
	icon: 'Censhare.svg',
	categories: [
		'media-video',
	],
	rules: [
		{
			id: 'censhare:dom:0',
			kind: 'dom',
			selector: "img[data-src*='CENSHARE'], img[src*='CENSHARE']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'high',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
