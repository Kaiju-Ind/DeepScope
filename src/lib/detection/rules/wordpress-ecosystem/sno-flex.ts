import type { TechnologyDefinition } from '../../types';

export const snoFlexTechnologyDefinition = {
	id: "sno-flex",
	name: "SNO Flex",
	website: "https://snosites.com",
	description: "SNO Flex is a WordPress theme developed by SNO Sites. SNO Sites is a company that specialises in providing website solutions for schools and educational institutions.",
	icon: "SNO.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "sno-flex:jsGlobal:0",
			kind: "jsGlobal",
			property: "sno_infographics_ajax_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
