import type { TechnologyDefinition } from '../../types';

export const appuonlineTechnologyDefinition = {
	id: "appuonline",
	name: "AppuOnline",
	website: "https://www.appuonline.com",
	description: "AppuOnline is a tool that provides embeddable stock charts for integration into websites or applications.",
	icon: "AppuOnline.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "appuonline:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.appuonline.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
