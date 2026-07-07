import type { TechnologyDefinition } from '../../types';

export const icimsTechnologyDefinition = {
	id: "icims",
	name: "iCIMS",
	website: "https://www.icims.com",
	description: "iCIMS is a talent acquisition and internal mobility platform that delivers solutions to build, retain, and scale your workforce.",
	icon: "iCIMS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "icims:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("icims\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
