import type { TechnologyDefinition } from '../../types';

export const casafariTechnologyDefinition = {
	id: "casafari",
	name: "Casafari",
	website: "https://casafaricrm.com",
	description: "Casafari is a real estate CRM platform designed for professionals to manage content, properties, tasks, and client relationships.",
	icon: "Casafari.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "casafari:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("admin\\.casafaricrm\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "casafari:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("casafaricrm\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "casafari:meta:2",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Casafari CRM$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "casafari:meta:3",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^casafari crm$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
