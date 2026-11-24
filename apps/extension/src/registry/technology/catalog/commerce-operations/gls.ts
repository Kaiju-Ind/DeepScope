import type { TechnologyDefinition } from '@/lib/detection/types';

export const glsTechnologyDefinition: TechnologyDefinition = {
	id: 'gls',
	name: 'GLS',
	website: 'https://gls-group.eu',
	description:
		'GLS offers parcel, logistics and express services, throughout Europe as well as in the US and in Canada.',
	icon: 'GLS.svg',
	categories: [
		'commerce-operations',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
