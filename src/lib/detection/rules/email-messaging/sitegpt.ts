import type { TechnologyDefinition } from '../../types';

export const sitegptTechnologyDefinition = {
	id: "sitegpt",
	name: "SiteGPT",
	website: "https://sitegpt.ai",
	description: "SiteGPT is an AI-powered chatbot that delivers personalized customer support by generating responses grounded in a site’s existing content.",
	icon: "SiteGPT.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sitegpt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sitegpt\\.ai\\/widget\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitegpt:jsGlobal:1",
			kind: "jsGlobal",
			property: "$sitegpt.push",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sitegpt:jsGlobal:2",
			kind: "jsGlobal",
			property: "$sitegpt_widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
