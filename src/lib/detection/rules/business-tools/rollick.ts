import type { TechnologyDefinition } from '../../types';

export const rollickTechnologyDefinition = {
	id: "rollick",
	name: "Rollick",
	website: "https://rollick.io",
	description: "Rollick is a lead management solution that connects manufacturers and dealers in the powersports, RV, marine, and industrial equipment industries.",
	icon: "Rollick.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rollick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.rollick\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
