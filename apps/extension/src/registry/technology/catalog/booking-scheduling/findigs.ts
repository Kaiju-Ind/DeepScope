import type { TechnologyDefinition } from '@/lib/detection/types';

export const findigsTechnologyDefinition: TechnologyDefinition = {
	id: 'findigs',
	name: 'Findigs',
	website: 'https://www.findigs.com',
	description:
		'Findigs is an all-in-one renting platform that streamlines the entire process from application to approval.',
	icon: 'Findigs.svg',
	categories: [
		'booking-scheduling',
	],
	rules: [
		{
			id: 'findigs:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('app\\.findigs\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
