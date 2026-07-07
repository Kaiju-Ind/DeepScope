import type { TechnologyDefinition } from '../../types';

export const sapoTechnologyDefinition = {
	id: "sapo",
	name: "Sapo",
	website: "https://www.sapo.vn",
	description: "Sapo is a popular multi-channel management and sales platform in Vietnam, offering advanced headless ecommerce technology to enhance the Omnichannel experience for over 230,000 merchants.",
	icon: "Sapo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sapo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bizweb",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
