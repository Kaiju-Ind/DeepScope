import type { TechnologyDefinition } from '../../types';

export const diviTechnologyDefinition: TechnologyDefinition = {
	id: 'divi',
	name: 'Divi',
	website: 'https://www.elegantthemes.com/gallery/divi',
	description:
		'Divi is a WordPress Theme and standalone WordPress plugin from Elegant themes that allows users to build websites using the visual drag-and-drop Divi page builder.',
	icon: 'Divi.svg',
	categories: [
		'platform-cms-builder',
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'divi:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('Divi\\/js\\/custom\\.(?:min|unified)\\.js\\?ver=([\\d.]+)'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'divi:dom:1',
			kind: 'dom',
			selector: 'style#divi-style-parent-inline-inline-css',
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'divi:jsGlobal:3',
			kind: 'jsGlobal',
			property: 'DIVI',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'divi:meta:4',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('Divi(?:\\sv\\.([\\d\\.]+))?', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Meta tag matches a known technology marker.',
		},
		{
			id: 'divi:jsGlobal:5',
			kind: 'jsGlobal',
			property: 'DiviArea',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'divi:jsGlobal:6',
			kind: 'jsGlobal',
			property: 'DiviAreaConfig',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'onetime',
			'recurring',
		],
		cpe: 'cpe:2.3:a:elegantthemes:divi:*:*:*:*:*:wordpress:*:*',
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
