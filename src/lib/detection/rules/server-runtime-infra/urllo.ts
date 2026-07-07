import type { TechnologyDefinition } from '../../types';

export const urlloTechnologyDefinition = {
	id: "urllo",
	name: "Urllo",
	website: "https://www.urllo.com",
	description: "Urllo is a URL redirection service designed for businesses to manage and streamline link forwarding.",
	icon: "Urllo.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "urllo:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.urllo-cdn.com']",
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
