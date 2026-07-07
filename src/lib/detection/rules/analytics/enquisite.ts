import type { TechnologyDefinition } from '../../types';

export const enquisiteTechnologyDefinition = {
	id: "enquisite",
	name: "Enquisite",
	website: "https://enquisite.com",
	description: "Enquisite is a platform that provides web analytics and metrics not typically available through standard webmaster tools.",
	icon: "Enquisite.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "enquisite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("log\\.enquisite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
