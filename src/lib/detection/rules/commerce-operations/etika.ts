import type { TechnologyDefinition } from '../../types';

export const etikaTechnologyDefinition = {
	id: "etika",
	name: "etika",
	website: "https://etika.com",
	description: "etika is a fintech company based in Manchester which provide buy now pay later solution.",
	icon: "etika.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "etika:jsGlobal:0",
			kind: "jsGlobal",
			property: "EtikaProductJsHelper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etika:jsGlobal:1",
			kind: "jsGlobal",
			property: "etikaBannerInject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "etika:jsGlobal:2",
			kind: "jsGlobal",
			property: "etikaGlobal",
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
