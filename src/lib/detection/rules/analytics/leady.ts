import type { TechnologyDefinition } from '../../types';

export const leadyTechnologyDefinition = {
	id: "leady",
	name: "Leady",
	website: "https://leady.cz",
	description: "Leady is a lead generation and customer intelligence solution.",
	icon: "Leady.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leady:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leady\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leady:jsGlobal:1",
			kind: "jsGlobal",
			property: "_leady.push",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leady:jsGlobal:2",
			kind: "jsGlobal",
			property: "leady_track_key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
