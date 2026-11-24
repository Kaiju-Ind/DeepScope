import type { TechnologyDefinition } from '@/lib/detection/types';

export const angulardartTechnologyDefinition: TechnologyDefinition = {
	id: 'angulardart',
	name: 'AngularDart',
	website: 'https://webdev.dartlang.org/angular/',
	icon: 'AngularDart.svg',
	categories: [
		'framework',
	],
	rules: [
		{
			id: 'angulardart:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'ngTestabilityRegistries',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	implies: [
		'dart',
	],
	excludes: [
		'angular',
		'angularjs',
	],
} as const satisfies TechnologyDefinition;
