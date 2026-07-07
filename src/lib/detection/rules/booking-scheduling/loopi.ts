import type { TechnologyDefinition } from '../../types';

export const loopiTechnologyDefinition = {
	id: "loopi",
	name: "Loopi",
	website: "https://www.loopi.fr",
	description: "Loopi is a digital ecosystem offering tools, integrations, and resources for tourism professionals to create, manage, and distribute multimodal tourist circuits.",
	icon: "Loopi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "loopi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.loopi-velo\\.fr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
