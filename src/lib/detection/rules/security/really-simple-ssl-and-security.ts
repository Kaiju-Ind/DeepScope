import type { TechnologyDefinition } from '../../types';

export const reallySimpleSslAndSecurityTechnologyDefinition = {
	id: "really-simple-ssl-and-security",
	name: "Really Simple SSL & Security",
	website: "https://really-simple-ssl.com",
	description: "Really Simple SSL & Security is an easy to install and performant security solution for WordPress.",
	icon: "really-simple-ssl.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "really-simple-ssl-and-security:dom:0",
			kind: "dom",
			selector: "body[data-rsssl]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
