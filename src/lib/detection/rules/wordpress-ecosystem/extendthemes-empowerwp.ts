import type { TechnologyDefinition } from '../../types';

export const extendthemesEmpowerwpTechnologyDefinition = {
	id: "extendthemes-empowerwp",
	name: "ExtendThemes EmpowerWP",
	website: "https://extendthemes.com/empowerwp",
	description: "ExtendThemes EmpowerWP is an flexible, multipurpose WordPress theme.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendthemes-empowerwp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/empowerwp(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extendthemes-empowerwp:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/empowerwp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
	excludes: [
		"extendthemes-mesmerize",
	],
} as const satisfies TechnologyDefinition;
