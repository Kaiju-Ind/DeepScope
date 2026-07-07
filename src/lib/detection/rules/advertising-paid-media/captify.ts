import type { TechnologyDefinition } from '../../types';

export const captifyTechnologyDefinition = {
	id: "captify",
	name: "Captify",
	website: "https://www.captifytechnologies.com",
	description: "Captify is a platform that offers search retargeting by combining keyword-based search marketing with the reach of display advertising.",
	icon: "Captify.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "captify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("data\\.captifymedia\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
