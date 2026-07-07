import type { TechnologyDefinition } from '../../types';

export const celebrosTechnologyDefinition = {
	id: "celebros",
	name: "Celebros",
	website: "https://www.celebros.com",
	description: "Celebros is a provider of conversion technology solutions for online shops, designed to improve user engagement and increase conversion rates.",
	icon: "Celebros.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "celebros:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("ai2\\.celebros-analytics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
