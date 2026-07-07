import type { TechnologyDefinition } from '../../types';

export const loftyTechnologyDefinition = {
	id: "lofty",
	name: "Lofty",
	website: "https://lofty.com",
	description: "Lofty is an all-in-one platform for real estate professionals that automates marketing campaigns and facilitates lead capture and conversion.",
	icon: "Lofty.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lofty:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.lofty\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
