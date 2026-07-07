import type { TechnologyDefinition } from '../../types';

export const angularMaterialTechnologyDefinition = {
	id: "angular-material",
	name: "Angular Material",
	website: "https://material.angularjs.org",
	description: "Angular Material is a UI component library for Angular JS developers. Angular Material components assist in constructing attractive, consistent, and functional web pages and web applications.",
	icon: "AngularJS.svg",
	categories: [
		"ui-library",
		"component-library",
	],
	rules: [
		{
			id: "angular-material:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/([\\d.rc-]+)?\\/angular-material(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "angular-material:jsGlobal:1",
			kind: "jsGlobal",
			property: "ngMaterial",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"angularjs",
	],
	excludes: [
		"material-design-lite",
	],
} as const satisfies TechnologyDefinition;
