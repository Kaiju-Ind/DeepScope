import type { TechnologyDefinition } from '../../types';

export const funnelformsTechnologyDefinition = {
	id: "funnelforms",
	name: "Funnelforms",
	website: "https://en.funnelforms.io",
	description: "Funnelforms is a WordPress plugin for creating intelligent multi-step forms, integrating AI to streamline business processes, enhance customer acquisition, and optimise staff recruitment.",
	icon: "Funnelforms.svg",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "funnelforms:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/Funnelforms']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
