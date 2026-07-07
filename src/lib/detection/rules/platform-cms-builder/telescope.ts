import type { TechnologyDefinition } from '../../types';

export const telescopeTechnologyDefinition = {
	id: "telescope",
	name: "Telescope",
	website: "https://telescopeapp.org",
	icon: "Telescope.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "telescope:jsGlobal:0",
			kind: "jsGlobal",
			property: "Telescope",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:telescopeapp:telescope:*:*:*:*:*:*:*:*",
	},
	implies: [
		"meteor",
		"react",
	],
} as const satisfies TechnologyDefinition;
