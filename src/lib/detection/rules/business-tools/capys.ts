import type { TechnologyDefinition } from '../../types';

export const capysTechnologyDefinition = {
	id: "capys",
	name: "CAPYS",
	website: "https://capys.com.br",
	description: "CAPYS is a CRM system designed to support builders in Brazil by managing client relationships, projects, and operational data.",
	icon: "CAPYS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "capys:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("crmapi\\.capys\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "capys:dom:1",
			kind: "dom",
			selector: "form[action*='crmapi.capys.com.br']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
