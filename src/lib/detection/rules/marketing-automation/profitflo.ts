import type { TechnologyDefinition } from '../../types';

export const profitfloTechnologyDefinition = {
	id: "profitflo",
	name: "ProfitFlo",
	website: "https://profitflo.io",
	description: "ProfitFlo is a platform that automates revenue generation by providing tools to attract and convert customers.",
	icon: "ProfitFlo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "profitflo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.profitflo\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "profitflo:dom:1",
			kind: "dom",
			selector: "chat-widget[agency-website*='profitflo.io']",
			description: "DOM selector matches a known technology marker.",
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
