import type { TechnologyDefinition } from '../../types';

export const klipTechnologyDefinition = {
	id: "klip",
	name: "Klip",
	website: "https://klipcoupons.com",
	description: "Klip is a tool for creating product page coupons designed to enhance customer engagement, boost conversions, and improve retention.",
	icon: "Klip.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "klip:jsGlobal:0",
			kind: "jsGlobal",
			property: "KLIP_APP_DATA.ATCPath",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
