import type { TechnologyDefinition } from '../../types';

export const phprsTechnologyDefinition: TechnologyDefinition = {
	id: 'phprs',
	name: 'phpRS',
	website: 'https://phprs.net',
	description: 'phpRS is a content management software written in PHP.',
	icon: 'default.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'phprs:meta:1',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('^phpRS$', 'i'),
			description: 'Meta tag matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'php',
	],
} as const satisfies TechnologyDefinition;
