import type { TechnologyDefinition } from '../../types';

export const aimeosTechnologyDefinition = {
	id: "aimeos",
	name: "AIMEOS",
	website: "https://aimeos.org",
	description: "Aimeos is a PHP ecommerce framework designed for custom online shops, multi-vendor marketplaces, and complex B2B applications.",
	icon: "aimeos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aimeos:dom:0",
			kind: "dom",
			selector: "link[href*='aimeos.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aimeos:jsGlobal:1",
			kind: "jsGlobal",
			property: "Aimeos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aimeos:jsGlobal:2",
			kind: "jsGlobal",
			property: "AimeosAccountFavorite",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aimeos:jsGlobal:3",
			kind: "jsGlobal",
			property: "AimeosBasketMini",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aimeos:jsGlobal:4",
			kind: "jsGlobal",
			property: "AimeosCatalog",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
