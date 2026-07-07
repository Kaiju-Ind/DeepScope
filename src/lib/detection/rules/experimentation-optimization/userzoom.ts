import type { TechnologyDefinition } from '../../types';

export const userzoomTechnologyDefinition = {
	id: "userzoom",
	name: "UserZoom",
	website: "https://www.userzoom.com",
	description: "UserZoom is a cloud-based user experience solution.",
	icon: "UserZoom.png",
	categories: [
		"experimentation-optimization",
		"analytics",
	],
	rules: [
		{
			id: "userzoom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.userzoom\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
