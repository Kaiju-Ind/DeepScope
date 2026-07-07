import type { TechnologyDefinition } from '../../types';

export const attentiveTechnologyDefinition = {
	id: "attentive",
	name: "Attentive",
	website: "https://www.attentivemobile.com",
	description: "Attentive is a personalised mobile messaging platform that helps retail & ecommerce brands acquire, retain, and interact with mobile shoppers.",
	icon: "Attentive.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "attentive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.attn\\.tv"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "attentive:jsGlobal:1",
			kind: "jsGlobal",
			property: "__attentive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "attentive:jsGlobal:2",
			kind: "jsGlobal",
			property: "__attentive_domain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "attentive:jsGlobal:3",
			kind: "jsGlobal",
			property: "attn_email_save",
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
