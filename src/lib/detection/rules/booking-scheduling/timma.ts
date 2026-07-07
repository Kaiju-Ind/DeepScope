import type { TechnologyDefinition } from '../../types';

export const timmaTechnologyDefinition = {
	id: "timma",
	name: "Timma",
	website: "https://timma.no",
	description: "Timma is a hair and salon booking system that enables users to schedule appointments with salons and stylists through an online platform.",
	icon: "Timma.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "timma:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.timma\\.no"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "timma:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Timma", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "timma:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^timma", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
