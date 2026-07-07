import type { TechnologyDefinition } from '../../types';

export const rhinofitTechnologyDefinition = {
	id: "rhinofit",
	name: "RhinoFit",
	website: "https://rhinofit.ca",
	description: "RhinoFit is a gym management software that supports membership management, billing, scheduling, and reporting for fitness businesses.",
	icon: "RhinoFit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rhinofit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("my\\.rhinofit\\.ca\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "rhinofit:dom:1",
			kind: "dom",
			selector: "iframe[src*='my.rhinofit.ca/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
