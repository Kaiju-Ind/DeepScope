import type { TechnologyDefinition } from '../../types';

export const historyTechnologyDefinition = {
	id: "history",
	name: "History",
	website: "https://github.com/ReactTraining/history",
	description: "Manage session history with JavaScript.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "history:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/history(@|\\/)([\\d.]+)(?:\\/[a-z]+)?\\/history(?:(.production|.development))?(?:.min)?\\.js"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
