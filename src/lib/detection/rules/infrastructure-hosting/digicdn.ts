import type { TechnologyDefinition } from '../../types';

export const digicdnTechnologyDefinition = {
	id: "digicdn",
	name: "DigiCDN",
	website: "https://digicloud.ir",
	description: "DigiCDN by Digicloud is a content delivery network featuring multiple servers and Anycast architecture, safeguarding your website against cyber attacks.",
	icon: "DigicloudCDN.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "digicdn:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("digicloud"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
