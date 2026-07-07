import type { TechnologyDefinition } from '../../types';

export const phaserTechnologyDefinition = {
	id: "phaser",
	name: "Phaser",
	website: "https://phaser.io",
	icon: "Phaser.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "phaser:jsGlobal:0",
			kind: "jsGlobal",
			property: "Phaser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phaser:jsGlobal:1",
			kind: "jsGlobal",
			property: "Phaser.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
