import type { TechnologyDefinition } from '@/lib/detection/types';

export const growcerTechnologyDefinition: TechnologyDefinition = {
	id: 'growcer',
	name: 'Growcer',
	website: 'https://www.yogrowcer.com',
	description:
		'Growcer is an online marketplace for grocery ordering and delivery, connecting customers with local stores for convenient shopping.',
	icon: 'Growcer.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'growcer:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('\\.yogrowcer\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'onetime',
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
