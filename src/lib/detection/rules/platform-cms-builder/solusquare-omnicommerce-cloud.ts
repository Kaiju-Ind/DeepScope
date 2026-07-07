import type { TechnologyDefinition } from '../../types';

export const solusquareOmnicommerceCloudTechnologyDefinition = {
	id: "solusquare-omnicommerce-cloud",
	name: "Solusquare OmniCommerce Cloud",
	website: "https://www.solusquare.com",
	icon: "Solusquare.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "solusquare-omnicommerce-cloud:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_solusquare$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "solusquare-omnicommerce-cloud:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Solusquare$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "solusquare-omnicommerce-cloud:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^solusquare$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"adobe-coldfusion",
	],
} as const satisfies TechnologyDefinition;
