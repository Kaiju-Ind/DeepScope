import type { TechnologyDefinition } from '../../types';

export const basinTechnologyDefinition = {
	id: "basin",
	name: "Basin",
	website: "https://usebasin.com",
	description: "Basin is a plug-and-play form backend for designers and developers, allowing users to collect submissions and track conversions without coding.",
	icon: "Basin.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "basin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.usebasin\\.com\\/v([\\d\\.]+)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "basin:dom:1",
			kind: "dom",
			selector: "form[action*='usebasin.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "basin:jsGlobal:2",
			kind: "jsGlobal",
			property: "onloadBasinCallback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
