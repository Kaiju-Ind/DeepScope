import type { TechnologyDefinition } from '../../types';

export const bizwebTechnologyDefinition = {
	id: "bizweb",
	name: "Bizweb",
	website: "https://www.bizweb.vn",
	icon: "bizweb.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bizweb:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bizweb",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
