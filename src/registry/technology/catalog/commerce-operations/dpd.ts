import type { TechnologyDefinition } from '@/lib/detection/types';

export const dpdTechnologyDefinition: TechnologyDefinition = {
	id: 'dpd',
	name: 'DPD',
	website: 'https://www.dpd.com',
	description: 'DPD is an international parcel delivery service for sorter compatible parcels.',
	icon: 'DPD.svg',
	categories: [
		'commerce-operations',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
