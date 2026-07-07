import type { TechnologyDefinition } from '../../types';

export const ibmCarbonDesignSystemTechnologyDefinition = {
	id: "ibm-carbon-design-system",
	name: "IBM Carbon Design System",
	website: "https://carbondesignsystem.com",
	description: "IBM Carbon Design System is an open-source design system for building products and digital experiences.",
	icon: "CarbonDesignSystem.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "ibm-carbon-design-system:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.s81c\\.com\\/common\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
