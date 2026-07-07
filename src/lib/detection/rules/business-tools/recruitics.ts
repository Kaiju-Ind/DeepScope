import type { TechnologyDefinition } from '../../types';

export const recruiticsTechnologyDefinition = {
	id: "recruitics",
	name: "Recruitics",
	website: "https://www.recruitics.com",
	description: "Recruitics is an AI-based recruitment marketing platform that supports job advertising, candidate targeting, performance analytics, and optimization across multiple hiring channels.",
	icon: "Recruitics.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "recruitics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.recruitics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recruitics:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.recruitics\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
