import type { TechnologyDefinition } from '@/lib/detection/types';

export const ziggyTechnologyDefinition: TechnologyDefinition = {
	id: 'ziggy',
	name: 'Ziggy',
	website: 'https://github.com/tighten/ziggy',
	description: 'Ziggy is a library that allows using Laravel named routes in JavaScript.',
	icon: 'Ziggy.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'ziggy:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Ziggy',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'inertia-js',
		'laravel',
	],
} as const satisfies TechnologyDefinition;
