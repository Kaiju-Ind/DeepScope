import type { TechnologyDefinition } from '../../types';

export const zenotiTechnologyDefinition = {
	id: "zenoti",
	name: "Zenoti",
	website: "https://www.zenoti.com/",
	description: "Zenoti is a cloud-based business software for spas, salons, and medspas, providing tools for managing appointment books, employee scheduling, and enabling online booking.",
	icon: "Zenoti.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zenoti:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.zenoti\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zenoti:meta:1",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("^zenoti$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zenoti:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^zenoti$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
