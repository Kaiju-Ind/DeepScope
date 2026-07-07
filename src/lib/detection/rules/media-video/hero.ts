import type { TechnologyDefinition } from '../../types';

export const heroTechnologyDefinition = {
	id: "hero",
	name: "Hero",
	website: "https://www.usehero.com/",
	description: "Hero is a virtual shopping platform for ecommerce and retail stores.",
	icon: "Hero.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "hero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.usehero\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hero:jsGlobal:1",
			kind: "jsGlobal",
			property: "HeroWebPluginSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
