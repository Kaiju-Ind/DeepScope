import type { TechnologyDefinition } from '@/lib/detection/types';

export const angularMaterialTechnologyDefinition: TechnologyDefinition = {
	id: 'angular-material',
	name: 'AngularJS Material',
	website: 'https://material.angularjs.org/',
	description:
		'AngularJS Material is an AngularJS 1.x UI component library that implements the 2014–2017 Google Material Design specification with reusable, tested, and accessible components.',
	icon: 'AngularJS.svg',
	categories: [
		'ui-library',
		'component-library',
	],
	rules: [
		{
			id: 'angular-material:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/([\\d.rc-]+)?\\/angular-material(?:\\.min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'angular-material:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'ngMaterial',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'angularjs',
	],
	excludes: [
		'material-design-lite',
	],
} as const satisfies TechnologyDefinition;
