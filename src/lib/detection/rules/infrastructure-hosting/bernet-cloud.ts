import type { TechnologyDefinition } from '../../types';

export const bernetCloudTechnologyDefinition = {
	id: "bernet-cloud",
	name: "Bernet Cloud",
	website: "https://bernet.cloud",
	description: "Bernet Cloud is a cloud management platform that enables global application deployment without requiring advanced technical expertise.",
	icon: "BernetCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "bernet-cloud:header:0",
			kind: "header",
			key: "Bc-Powered-By",
			valuePattern: new RegExp("bernet\\.cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bernet-cloud:header:1",
			kind: "header",
			key: "bc-powered-by",
			valuePattern: new RegExp("bernet\\.cloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
