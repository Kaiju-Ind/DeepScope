import type { TechnologyDefinition } from '../../types';

export const visitorJsTechnologyDefinition = {
	id: "visitor-js",
	name: "Visitor.js",
	website: "https://www.visitorjs.com",
	description: "Visitor.js is a tool that personalizes website content to optimize user engagement and improve conversion rates.",
	icon: "Visitor.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "visitor-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.visitorjs\\.com"),
			description: "Script source URL matches a known technology marker.",
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
