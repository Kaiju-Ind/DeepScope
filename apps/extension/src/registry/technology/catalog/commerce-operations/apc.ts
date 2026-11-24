import type { TechnologyDefinition } from '@/lib/detection/types';

export const apcTechnologyDefinition: TechnologyDefinition = {
	id: 'apc',
	name: 'APC',
	website: 'https://www.apc-pli.com',
	description: 'APC offers door-to-door parcel and mail delivery.',
	icon: 'APC.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'apc:resourceUrl:owned-host',
			kind: 'resourceUrl',
			pattern: new RegExp('https?://[^\\s"\'<>/]*(?:apc-pli|apc-overnight)\\.[^\\s"\'<>/]+/', 'i'),
			confidence: 85,
			description: 'Loaded resource URL uses an APC delivery host.',
		},
	],
} as const satisfies TechnologyDefinition;
