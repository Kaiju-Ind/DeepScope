import type { TechnologyDefinition } from '../../types';

export const fixerTechnologyDefinition = {
	id: "fixer",
	name: "Fixer",
	website: "https://fixer.io",
	description: "Fixer is a lightweight JSON API that provides current and historical foreign exchange rates and supports currency conversion.",
	icon: "Fixer.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "fixer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.fixer\\.io\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
