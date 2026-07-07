import type { TechnologyDefinition } from '../../types';

export const catylistTechnologyDefinition = {
	id: "catylist",
	name: "Catylist",
	website: "https://cre.moodysanalytics.com/products/catylist",
	description: "Catylist is an all-in-one platform for commercial real estate brokers, offering CRE data, reporting and marketing tools, and property listings.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "catylist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.catylist\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
