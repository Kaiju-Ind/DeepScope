import type { TechnologyDefinition } from '@/lib/detection/types';

export const trayTechnologyDefinition: TechnologyDefinition = {
	id: 'tray',
	name: 'Tray',
	website: 'https://www.tray.com.br',
	description: 'Tray is an all-in-one ecommerce platform from Brazil.',
	icon: 'tray.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'tray:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('tcdn\\.com\\.br'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
