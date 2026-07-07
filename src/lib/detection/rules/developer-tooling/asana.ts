import type { TechnologyDefinition } from '../../types';

export const asanaTechnologyDefinition = {
	id: "asana",
	name: "Asana",
	website: "https://asana.com",
	description: "Asana is a web and mobile application designed to help teams organize, track, and manage their work.",
	icon: "Asana.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "asana:dom:0",
			kind: "dom",
			selector: "a[href*='form.asana.com'], a[href*='app.asana.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
