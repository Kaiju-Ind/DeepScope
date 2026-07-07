import type { TechnologyDefinition } from '../../types';

export const pagolightTechnologyDefinition = {
	id: "pagolight",
	name: "Pagolight",
	website: "https://pagolight.it",
	description: "Pagolight is a BNPL system allowing instalment payments for online purchases.",
	icon: "Pagolight.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pagolight:dom:0",
			kind: "dom",
			selector: "div#heidipay-container, div[data-heidipay], div#pagolight-pro-dialog, iframe#heidipay-iframe-product-description-pagolight",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pagolight:jsGlobal:1",
			kind: "jsGlobal",
			property: "closePagodilModal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagolight:jsGlobal:2",
			kind: "jsGlobal",
			property: "openPagodilModal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagolight:jsGlobal:3",
			kind: "jsGlobal",
			property: "pagodilLang",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagolight:jsGlobal:4",
			kind: "jsGlobal",
			property: "pagodilSprintf",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
