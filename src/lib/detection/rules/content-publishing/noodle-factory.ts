import type { TechnologyDefinition } from '../../types';

export const noodleFactoryTechnologyDefinition = {
	id: "noodle-factory",
	name: "Noodle Factory",
	website: "https://www.noodlefactory.ai",
	description: "Noodle Factory is a tutor platform that enhances teaching through personalized and engaging student learning experiences.",
	icon: "NoodleFactory.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "noodle-factory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portalapi\\.noodlefactory\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
