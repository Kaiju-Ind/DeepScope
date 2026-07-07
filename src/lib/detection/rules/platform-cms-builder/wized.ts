import type { TechnologyDefinition } from '../../types';

export const wizedTechnologyDefinition = {
	id: "wized",
	name: "Wized",
	website: "https://www.wized.io",
	description: "Wized is a web application builder that enables the creation of apps without requiring any coding knowledge.",
	icon: "Wized.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wized:jsGlobal:0",
			kind: "jsGlobal",
			property: "Wized.data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wized:jsGlobal:1",
			kind: "jsGlobal",
			property: "wized_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wized:jsGlobal:2",
			kind: "jsGlobal",
			property: "wized_config_dev",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
