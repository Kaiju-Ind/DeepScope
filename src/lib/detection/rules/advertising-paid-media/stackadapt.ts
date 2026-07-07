import type { TechnologyDefinition } from '../../types';

export const stackadaptTechnologyDefinition = {
	id: "stackadapt",
	name: "StackAdapt",
	website: "https://www.stackadapt.com",
	description: "StackAdapt is a platform that provides a content advertising strategy solution for planning, executing, and optimizing digital campaigns.",
	icon: "StackAdapt.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "stackadapt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("srv\\.stackadapt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
