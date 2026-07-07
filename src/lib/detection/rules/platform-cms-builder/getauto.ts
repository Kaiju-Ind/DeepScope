import type { TechnologyDefinition } from '../../types';

export const getautoTechnologyDefinition = {
	id: "getauto",
	name: "GetAuto",
	website: "https://getauto.com",
	description: "GetAuto is a platform offering an inventory of used cars available for purchase.",
	icon: "GetAuto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "getauto:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.getauto.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
