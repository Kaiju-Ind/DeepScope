import type { TechnologyDefinition } from '../../types';

export const elkarteTechnologyDefinition = {
	id: "elkarte",
	name: "ElkArte",
	website: "https://www.elkarte.net",
	description: "ElkArte is an open-source PHP-based forum software with MySQL integration, offering features such as user authentication, topic categorisation, post formatting, private messaging, moderation tools, and customisable themes and extensions.",
	icon: "ElkArte.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "elkarte:jsGlobal:0",
			kind: "jsGlobal",
			property: "elk_forum_action",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elkarte:jsGlobal:1",
			kind: "jsGlobal",
			property: "elk_iso_case_folding",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"mysql",
	],
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;
