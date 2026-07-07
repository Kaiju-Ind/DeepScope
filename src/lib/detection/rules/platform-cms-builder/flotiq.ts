import type { TechnologyDefinition } from '../../types';

export const flotiqTechnologyDefinition = {
	id: "flotiq",
	name: "Flotiq",
	website: "https://flotiq.com",
	description: "Flotiq is a content management platform that enables teams to create, collaborate on, and publish content without unnecessary complexity.",
	icon: "Flotiq.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flotiq:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.flotiq\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
