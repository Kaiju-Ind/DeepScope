import type { TechnologyDefinition } from '@/lib/detection/types';

export const kissmetricsTechnologyDefinition: TechnologyDefinition = {
	id: 'kissmetrics',
	name: 'KISSmetrics',
	website: 'https://www.kissmetrics.com',
	icon: 'KISSmetrics.png',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'kissmetrics:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'KM_COOKIE_DOMAIN',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;
