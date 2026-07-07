import type { TechnologyDefinition } from '../../types';

export const kqsStoreTechnologyDefinition = {
	id: "kqs-store",
	name: "KQS.store",
	website: "https://www.kqs.pl",
	description: "KQS.store is an ecommerce software.",
	icon: "KQS.store.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kqs-store:dom:0",
			kind: "dom",
			selector: "a[href*='kqsdesign.pl'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kqs-store:dom:1",
			kind: "dom",
			selector: "a[href*='kqs.pl'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kqs-store:dom:2",
			kind: "dom",
			selector: "#kqs-box,kqs-cookie",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kqs-store:jsGlobal:3",
			kind: "jsGlobal",
			property: "kqs_box",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kqs-store:jsGlobal:4",
			kind: "jsGlobal",
			property: "kqs_off",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
