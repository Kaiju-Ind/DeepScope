import type { TechnologyDefinition } from '../../types';

export const sqliteTechnologyDefinition = {
	id: "sqlite",
	name: "SQLite",
	website: "https://www.sqlite.org",
	icon: "SQLite.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:sqlite:sqlite:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
