import type { TechnologyDefinition } from '@/lib/detection/types';

export const zipkinTechnologyDefinition: TechnologyDefinition = {
	id: 'zipkin',
	name: 'Zipkin',
	website: 'https://zipkin.io/',
	icon: 'Zipkin.png',
	categories: [
		'analytics',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
