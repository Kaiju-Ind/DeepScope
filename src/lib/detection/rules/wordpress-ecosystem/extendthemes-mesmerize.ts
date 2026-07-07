import type { TechnologyDefinition } from '../../types';

export const extendthemesMesmerizeTechnologyDefinition = {
	id: "extendthemes-mesmerize",
	name: "ExtendThemes Mesmerize",
	website: "https://extendthemes.com/mesmerize",
	description: "ExtendThemes Mesmerize is an flexible, multipurpose WordPress theme.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendthemes-mesmerize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/mesmerize(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extendthemes-mesmerize:dom:1",
			kind: "dom",
			selector: "link#mesmerize-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "extendthemes-mesmerize:jsGlobal:2",
			kind: "jsGlobal",
			property: "MesmerizeKube",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extendthemes-mesmerize:jsGlobal:3",
			kind: "jsGlobal",
			property: "mesmerizeDomReady",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extendthemes-mesmerize:jsGlobal:4",
			kind: "jsGlobal",
			property: "mesmerizeFooterParalax",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extendthemes-mesmerize:jsGlobal:5",
			kind: "jsGlobal",
			property: "mesmerizeMenuSticky",
			description: "Page-owned global matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
