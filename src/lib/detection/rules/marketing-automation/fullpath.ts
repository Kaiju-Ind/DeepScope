import type { TechnologyDefinition } from '../../types';

export const fullpathTechnologyDefinition = {
	id: "fullpath",
	name: "Fullpath",
	website: "https://www.fullpath.com",
	description: "Fullpath is a Customer Data and Experience Platform (CDXP) for the automotive retail industry, formerly known as AutoLeadStar.",
	icon: "Fullpath.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fullpath:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.autoleadstar\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
