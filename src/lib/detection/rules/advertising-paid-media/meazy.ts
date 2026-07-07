import type { TechnologyDefinition } from '../../types';

export const meazyTechnologyDefinition = {
	id: "meazy",
	name: "Meazy",
	website: "https://meazy.co",
	description: "Meazy is a tool that provides automated remarketing solutions tailored for online stores.",
	icon: "Meazy.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "meazy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.meazy\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
