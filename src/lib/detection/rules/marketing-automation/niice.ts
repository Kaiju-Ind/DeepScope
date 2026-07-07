import type { TechnologyDefinition } from '../../types';

export const niiceTechnologyDefinition = {
	id: "niice",
	name: "Niice",
	website: "https://www.niice.nl",
	description: "Niice is a Dutch marketing automation platform that streamlines campaign management, customer engagement, and data-driven communication processes.",
	icon: "Niice.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "niice:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("niice\\.nl"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
