import type { TechnologyDefinition } from '../../types';

export const salesAuotomatorTechnologyDefinition = {
	id: "sales-auotomator",
	name: "Sales Auotomator",
	website: "https://www.salesautomator.io/automations",
	description: "Sales Automator is a tool designed to automate sales processes and help increase overall sales.",
	icon: "SalesAutomator.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sales-auotomator:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.salesautomator\\.io"),
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
