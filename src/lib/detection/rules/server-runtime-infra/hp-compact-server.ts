import type { TechnologyDefinition } from '../../types';

export const hpCompactServerTechnologyDefinition = {
	id: "hp-compact-server",
	name: "HP Compact Server",
	website: "https://hp.com",
	icon: "HP.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hp-compact-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("HP_Compact_Server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hp-compact-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("hp_compact_server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
