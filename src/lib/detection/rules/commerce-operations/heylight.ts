import type { TechnologyDefinition } from '../../types';

export const heylightTechnologyDefinition = {
	id: "heylight",
	name: "HeyLight",
	website: "https://heylight.com/it/it",
	description: "HeyLight is a BNPL system allowing instalment payments for online purchases.",
	icon: "HeyLight.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "heylight:dom:0",
			kind: "dom",
			selector: "div#heidipay-container, div[data-heidipay], div#pagolight-pro-dialog, iframe#heidipay-iframe-product-description-pagolight, style#heyLightFonts",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "heylight:jsGlobal:1",
			kind: "jsGlobal",
			property: "closePagodilModal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heylight:jsGlobal:2",
			kind: "jsGlobal",
			property: "openPagodilModal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heylight:jsGlobal:3",
			kind: "jsGlobal",
			property: "pagodilLang",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heylight:jsGlobal:4",
			kind: "jsGlobal",
			property: "pagodilSprintf",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
