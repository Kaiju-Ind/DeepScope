import type { TechnologyDefinition } from '../../types';

export const harriTechnologyDefinition = {
	id: "harri",
	name: "Harri",
	website: "https://harri.com",
	description: "Harri is a platform offering tools to automate HR processes, support remote work, and provide analytics on hiring trends and labor costs.",
	icon: "Harri.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "harri:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.ourstory\\.harri\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "harri:dom:1",
			kind: "dom",
			selector: "link[href*='.ourstory.harri.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
