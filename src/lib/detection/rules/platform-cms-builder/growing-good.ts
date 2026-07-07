import type { TechnologyDefinition } from '../../types';

export const growingGoodTechnologyDefinition = {
	id: "growing-good",
	name: "Growing Good",
	website: "https://growing-good.co.uk",
	description: "Growing Good is a software platform for local veg box schemes, providing tools to manage operations.",
	icon: "GrowingGood.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "growing-good:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("growinggood\\.ams3\\.digitaloceanspaces"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
