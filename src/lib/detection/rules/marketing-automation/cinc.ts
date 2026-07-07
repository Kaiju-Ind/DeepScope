import type { TechnologyDefinition } from '../../types';

export const cincTechnologyDefinition = {
	id: "cinc",
	name: "CINC",
	website: "https://www.cincpro.com",
	description: "CINC is a lead acquisition and conversion platform for teams and top real estate agents.",
	icon: "CINC.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "cinc:jsGlobal:0",
			kind: "jsGlobal",
			property: "CINC.AjaxApi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
