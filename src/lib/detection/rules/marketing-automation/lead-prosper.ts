import type { TechnologyDefinition } from '../../types';

export const leadProsperTechnologyDefinition = {
	id: "lead-prosper",
	name: "Lead Prosper",
	website: "https://leadprosper.io",
	description: "Lead Prosper is a lead distribution platform that facilitates connections between lead suppliers and lead buyers.",
	icon: "LeadProsper.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lead-prosper:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.leadprosper\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
