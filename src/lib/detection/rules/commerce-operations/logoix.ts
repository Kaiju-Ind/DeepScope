import type { TechnologyDefinition } from '../../types';

export const logoixTechnologyDefinition = {
	id: "logoix",
	name: "LogoiX",
	website: "https://www.logoix.com",
	description: "LogoiX is a German shipping company.",
	icon: "LogoiX.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "logoix:text:0",
			kind: "text",
			pattern: new RegExp("\\bLogoiX\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
