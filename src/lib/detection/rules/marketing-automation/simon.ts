import type { TechnologyDefinition } from '../../types';

export const simonTechnologyDefinition = {
	id: "simon",
	name: "Simon",
	website: "https://www.simondata.com/",
	description: "Simon is a customer data platform (CDP) that helps you collect, clean, and control your customer data.",
	icon: "Simon.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "simon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.simonsignal\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simon:dom:1",
			kind: "dom",
			selector: "link[href*='.simonsignal.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "simon:jsGlobal:2",
			kind: "jsGlobal",
			property: "SimonData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
