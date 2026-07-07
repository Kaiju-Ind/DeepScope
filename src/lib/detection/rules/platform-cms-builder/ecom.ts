import type { TechnologyDefinition } from '../../types';

export const ecomTechnologyDefinition = {
	id: "ecom",
	name: "Ecom",
	website: "https://ecom.md",
	description: "Ecom is a website builder and application development platform designed for online businesses to create, manage, and deploy web-based commerce solutions.",
	icon: "Ecom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecom:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.ecom\\.md"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
