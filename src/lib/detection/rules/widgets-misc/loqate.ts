import type { TechnologyDefinition } from '../../types';

export const loqateTechnologyDefinition = {
	id: "loqate",
	name: "Loqate",
	website: "https://www.loqate.com",
	description: "Loqate is an address verification solution.",
	icon: "Loqate.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "loqate:jsGlobal:0",
			kind: "jsGlobal",
			property: "loqateAccountCode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loqate:jsGlobal:1",
			kind: "jsGlobal",
			property: "pca.platform.productList",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
