import type { TechnologyDefinition } from '../../types';

export const twiagoTechnologyDefinition = {
	id: "twiago",
	name: "Twiago",
	website: "https://www.twiago.com",
	description: "Twiago is a digital advertising solution that provides transparency and is tailored to specific business needs.",
	icon: "Twiago.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "twiago:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.twiago\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
