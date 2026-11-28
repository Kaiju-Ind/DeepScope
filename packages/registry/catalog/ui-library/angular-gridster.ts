import type { TechnologyDefinition } from "../../types.ts";

export const angularGridsterTechnologyDefinition: TechnologyDefinition = {
	id: 'angular-gridster',
	name: 'Angular Gridster',
	website: 'https://manifestwebdesign.github.io/angular-gridster/',
	description:
		'Angular Gridster is an AngularJS directive implementation of gridster-like dashboard widgets with draggable and resizable layouts.',
	icon: 'Angular.svg',
	categories: [
		'ui-library',
		'graphics-visualization',
		'widgets-misc',
	],
	rules: [
		{
			id: 'angular-gridster:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('angular-gridster(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
