import type { TechnologyDefinition } from '../../types';

export const roasFunnelsTechnologyDefinition = {
	id: "roas-funnels",
	name: "Roas Funnels",
	website: "https://roasfunnels.com",
	description: "Roas Funnels is an all-in-one digital marketing platform designed to support business growth through tools and strategies.",
	icon: "RoasFunnels.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "roas-funnels:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.roasfunnels\\.com"),
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
