import type { TechnologyDefinition } from '../../types';

export const cozyAntitheftTechnologyDefinition = {
	id: "cozy-antitheft",
	name: "Cozy AntiTheft",
	website: "https://apps.shopify.com/cozy-antitheft-for-images-and-more",
	description: "Cozy AntiTheft helps you to protect your store content, images and texts from being stolen with a few simple clicks.",
	icon: "Cozy AntiTheft.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "cozy-antitheft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdncozyantitheft\\.addons\\.business\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cozy-antitheft:jsGlobal:1",
			kind: "jsGlobal",
			property: "cozyEcoAdnsUa",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
