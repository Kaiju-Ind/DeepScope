import type { TechnologyDefinition } from '../../types';

export const omedaTechnologyDefinition = {
	id: "omeda",
	name: "Omeda",
	website: "https://www.omeda.com",
	description: "Omeda is a platform that enables the creation of new products by starting with accurate audience segmentation and targeting.",
	icon: "Omeda.svg",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "omeda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("olytics\\.omeda\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
