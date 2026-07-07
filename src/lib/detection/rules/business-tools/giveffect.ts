import type { TechnologyDefinition } from '../../types';

export const giveffectTechnologyDefinition = {
	id: "giveffect",
	name: "Giveffect",
	website: "https://www.giveffect.com",
	description: "Giveffect is a not-for-profit customer relationship management system designed to support organizational operations and engagement.",
	icon: "Giveffect.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "giveffect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.giveffect\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "giveffect:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.giveffect\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
