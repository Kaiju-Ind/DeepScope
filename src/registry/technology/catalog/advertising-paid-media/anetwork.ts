import type { TechnologyDefinition } from '@/lib/detection/types';

export const anetworkTechnologyDefinition: TechnologyDefinition = {
	id: 'anetwork',
	name: 'Anetwork',
	website: 'https://www.anetwork.ir',
	icon: 'Anetwork.png',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'anetwork:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('static-cdn\\.anetwork\\.ir\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
