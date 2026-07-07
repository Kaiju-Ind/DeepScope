import type { TechnologyDefinition } from '../../types';

export const teleporthqTechnologyDefinition = {
	id: "teleporthq",
	name: "TeleportHQ",
	website: "https://teleporthq.io",
	description: "TeleportHQ is a front-end development platform featuring a visual builder and headless content modeling capabilities.",
	icon: "TeleportHq.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "teleporthq:dom:0",
			kind: "dom",
			selector: "link[href*='/@teleporthq/teleport-custom-scripts/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"poa",
			"recurring",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
