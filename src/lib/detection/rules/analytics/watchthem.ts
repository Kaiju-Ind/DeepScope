import type { TechnologyDefinition } from '../../types';

export const watchthemTechnologyDefinition = {
	id: "watchthem",
	name: "WatchThem",
	website: "https://watchthem.live",
	description: "WatchThem is a behavioural tool that allows website owners to view video recordings of their visitors' journeys on their website.",
	icon: "WatchThem.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "watchthem:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.watchthem\\.live\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
