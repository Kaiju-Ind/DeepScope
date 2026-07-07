import type { TechnologyDefinition } from '../../types';

export const spikmiTechnologyDefinition = {
	id: "spikmi",
	name: "Spikmi",
	website: "https://spikmi.com",
	description: "Spikmi is a messenger communication button for websites that enables convenient customer support access from anywhere in the world.",
	icon: "Spikmi.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "spikmi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/spikmi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
