import type { TechnologyDefinition } from '../../types';

export const ynapEcommerceTechnologyDefinition = {
	id: "ynap-ecommerce",
	name: "YNAP Ecommerce",
	website: "https://www.ynap.com/pages/about-us/what-we-do/monobrand/",
	description: "YNAP provides a suite of B2B luxury services including online and mobile store development, omnichannel logistics, customer care, digital marketing, data-driven merchandising and global strategy development.",
	icon: "YNAP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ynap-ecommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "yTos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ynap-ecommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "ycookieApiUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
