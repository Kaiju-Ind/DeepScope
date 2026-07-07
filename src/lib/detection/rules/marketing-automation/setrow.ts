import type { TechnologyDefinition } from '../../types';

export const setrowTechnologyDefinition = {
	id: "setrow",
	name: "Setrow",
	website: "https://setrow.com",
	description: "Setrow is a platform offering integrated digital marketing tools, including email and SMS marketing, push notifications, and recommendation engines, to optimize customer engagement and marketing strategies.",
	icon: "Setrow.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "setrow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.setrowid\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "setrow:jsGlobal:1",
			kind: "jsGlobal",
			property: "setrowCookies",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "setrow:jsGlobal:2",
			kind: "jsGlobal",
			property: "setrowID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "setrow:jsGlobal:3",
			kind: "jsGlobal",
			property: "setrowSua",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
