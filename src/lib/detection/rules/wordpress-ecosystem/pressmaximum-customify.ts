import type { TechnologyDefinition } from '../../types';

export const pressmaximumCustomifyTechnologyDefinition = {
	id: "pressmaximum-customify",
	name: "PressMaximum Customify",
	website: "https://pressmaximum.com/customify",
	description: "PressMaximum Customify is lightweight, responsive and flexible multipurpose WordPress theme.",
	icon: "PressMaximum.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "pressmaximum-customify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/customify\\/.+theme\\.min\\.js(?:.+ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pressmaximum-customify:jsGlobal:1",
			kind: "jsGlobal",
			property: "Customify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pressmaximum-customify:jsGlobal:2",
			kind: "jsGlobal",
			property: "Customify_JS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pressmaximum-customify:jsGlobal:3",
			kind: "jsGlobal",
			property: "customify_is_mobile",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
