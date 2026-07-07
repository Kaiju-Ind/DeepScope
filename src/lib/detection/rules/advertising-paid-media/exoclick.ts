import type { TechnologyDefinition } from '../../types';

export const exoclickTechnologyDefinition = {
	id: "exoclick",
	name: "ExoClick",
	website: "https://www.exoclick.com",
	description: "ExoClick is a Barcelona-based online advertising company, which provides online advertising services to both advertisers and publishers.",
	icon: "ExoClick.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "exoclick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.exoclick\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
