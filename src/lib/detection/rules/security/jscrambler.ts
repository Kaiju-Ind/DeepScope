import type { TechnologyDefinition } from '../../types';

export const jscramblerTechnologyDefinition = {
	id: "jscrambler",
	name: "Jscrambler",
	website: "https://jscrambler.com",
	description: "Jscrambler is a client-side security solution for JavaScript that protects application code through obfuscation, runtime protection, and tamper detection to reduce the risk of reverse engineering and code manipulation.",
	icon: "Jscrambler.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "jscrambler:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jscrambler\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jscrambler:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.jscrambler\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
