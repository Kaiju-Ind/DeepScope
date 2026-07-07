import type { TechnologyDefinition } from '../../types';

export const sierraInteractiveTechnologyDefinition = {
	id: "sierra-interactive",
	name: "Sierra Interactive",
	website: "https://www.sierrainteractive.com",
	description: "Sierra Interactive is a real estate platform that enables brand differentiation and personalized lead nurturing for property professionals.",
	icon: "SierraInteractive.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sierra-interactive:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.sierrainteractive\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sierra-interactive:jsGlobal:1",
			kind: "jsGlobal",
			property: "SI_BASE_URL_CAA",
			description: "Page-owned global matches a known technology marker.",
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
