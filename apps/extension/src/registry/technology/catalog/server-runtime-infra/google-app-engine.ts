import type { TechnologyDefinition } from '@/lib/detection/types';

export const googleAppEngineTechnologyDefinition: TechnologyDefinition = {
	id: 'google-app-engine',
	name: 'Google App Engine',
	website: 'https://cloud.google.com/appengine',
	icon: 'Google App Engine.svg',
	categories: [
		'server-runtime-infra',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
