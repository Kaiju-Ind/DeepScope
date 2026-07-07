import type { TechnologyDefinition } from '../../types';

export const canopyConnectTechnologyDefinition = {
	id: "canopy-connect",
	name: "Canopy Connect",
	website: "https://www.usecanopy.com",
	description: "Canopy Connect is a tool that enables instant collection of insurance information for verification, analysis, or onboarding processes.",
	icon: "CanopyConnect.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "canopy-connect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.usecanopy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "canopy-connect:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.usecanopy.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
