import type { TechnologyDefinition } from '../../types';

export const kuleaMarketingTechnologyDefinition = {
	id: "kulea-marketing",
	name: "Kulea Marketing",
	website: "https://kulea.ma",
	description: "Kulea Marketing is a provider of inbound marketing and marketing automation software designed to streamline campaign management and customer engagement.",
	icon: "KuleaMarketing.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kulea-marketing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.prod\\.kulea\\.marketing\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
