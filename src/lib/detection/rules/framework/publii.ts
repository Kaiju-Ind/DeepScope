import type { TechnologyDefinition } from '../../types';

export const publiiTechnologyDefinition = {
	id: "publii",
	name: "Publii",
	website: "https://getpublii.com",
	description: "Publii is a SEO- and privacy-focused website generator designed for creating static websites.",
	icon: "Publii.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "publii:dom:0",
			kind: "dom",
			selector: "meta[content*='Publii Open-Source CMS for Static Site']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "publii:jsGlobal:1",
			kind: "jsGlobal",
			property: "publiiDetectLoadedImages",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "publii:jsGlobal:2",
			kind: "jsGlobal",
			property: "publiiThemeMenuConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
