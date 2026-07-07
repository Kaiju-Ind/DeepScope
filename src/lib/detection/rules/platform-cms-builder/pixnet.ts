import type { TechnologyDefinition } from '../../types';

export const pixnetTechnologyDefinition = {
	id: "pixnet",
	name: "Pixnet",
	website: "https://www.pixnet.net",
	description: "Pixnet is an Taiwanese mobile photo sharing, blogging, and social networking service.",
	icon: "Pixnet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixnet:jsGlobal:0",
			kind: "jsGlobal",
			property: "pix.MIB",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
