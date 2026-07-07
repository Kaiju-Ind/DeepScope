import type { TechnologyDefinition } from '../../types';

export const yaclaTechnologyDefinition = {
	id: "yacla",
	name: "Yacla",
	website: "https://yacla.com",
	description: "Yacla is a service that delivers prequalified, engaged sales contacts directly to a CRM at a predetermined fixed price.",
	icon: "Yacla.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "yacla:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.yac\\.la"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
