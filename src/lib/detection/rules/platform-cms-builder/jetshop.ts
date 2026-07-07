import type { TechnologyDefinition } from '../../types';

export const jetshopTechnologyDefinition = {
	id: "jetshop",
	name: "Jetshop",
	website: "https://jetshop.se",
	icon: "Jetshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jetshop:html:0",
			kind: "html",
			pattern: new RegExp("<(?:div|aside) id=\"jetshop-branding\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jetshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "JetshopData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
