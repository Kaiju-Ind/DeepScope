import type { TechnologyDefinition } from '../../types';

export const lawmaticsTechnologyDefinition = {
	id: "lawmatics",
	name: "Lawmatics",
	website: "https://www.lawmatics.com",
	description: "Lawmatics is a growth platform for law firms that streamlines client intake, marketing automation, and workflow management.",
	icon: "Lawmatics.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lawmatics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("navi\\.lawmatics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
