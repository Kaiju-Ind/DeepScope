import type { TechnologyDefinition } from '../../types';

export const mierucaTechnologyDefinition = {
	id: "mieruca",
	name: "Mieruca",
	website: "https://mieru-ca.com",
	description: "Mieruca is a Japanese SEO analysis tool designed to measure and improve website visibility through data-driven insights.",
	icon: "Mieruca.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mieruca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hm\\.mieru-ca\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
