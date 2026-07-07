import type { TechnologyDefinition } from '../../types';

export const brainleadTechnologyDefinition = {
	id: "brainlead",
	name: "Brainlead",
	website: "https://brainlead.it",
	description: "Brainlead is a marketing automation software.",
	icon: "Brainlead.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brainlead:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.brainlead\\.it"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
