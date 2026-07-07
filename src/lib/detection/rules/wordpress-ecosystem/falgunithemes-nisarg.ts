import type { TechnologyDefinition } from '../../types';

export const falgunithemesNisargTechnologyDefinition = {
	id: "falgunithemes-nisarg",
	name: "FalguniThemes Nisarg",
	website: "https://www.falgunithemes.com/downloads/nisarg",
	description: "FalguniThemes Nisarg is a new fully responsive and translation ready WordPress theme.",
	icon: "FalguniThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "falgunithemes-nisarg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/nisarg(?:pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "falgunithemes-nisarg:jsGlobal:1",
			kind: "jsGlobal",
			property: "nisargpro_script_vars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
