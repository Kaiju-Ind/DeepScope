import type { TechnologyDefinition } from '@/lib/detection/types';

export const pushlyTechnologyDefinition: TechnologyDefinition = {
	id: 'pushly',
	name: 'Pushly',
	website: 'https://www.pushly.com',
	description:
		'Pushly is a web push notification platform that allows businesses to send real-time messages to their website visitors.',
	icon: 'Pushly.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'pushly:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'PushlySDK',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
