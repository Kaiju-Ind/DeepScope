import type { TechnologyDefinition } from '../../types';

export const akoovaTechnologyDefinition = {
	id: "akoova",
	name: "Akoova",
	website: "https://akoova.com",
	description: "Akoova is an AWS-native managed platform that enables scalable deployment, hosting, and operation of Magento and Adobe Commerce environments.",
	icon: "Akoova.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "akoova:header:0",
			kind: "header",
			key: "K-Hosting-By",
			valuePattern: new RegExp("^Akoova$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
