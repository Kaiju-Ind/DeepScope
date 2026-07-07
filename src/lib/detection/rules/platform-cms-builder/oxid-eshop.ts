import type { TechnologyDefinition } from '../../types';

export const oxidEshopTechnologyDefinition = {
	id: "oxid-eshop",
	name: "OXID eShop",
	website: "https://www.oxid-esales.com",
	description: "OXID eShop is a free, open source ecommerce solution built using object oriented programming and PHP.",
	icon: "OXID eShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oxid-eshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "oxCookieNote",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "oxInputValidator",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "oxLoginBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:jsGlobal:3",
			kind: "jsGlobal",
			property: "oxMiniBasket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:jsGlobal:4",
			kind: "jsGlobal",
			property: "oxModalPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:jsGlobal:5",
			kind: "jsGlobal",
			property: "oxTopMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oxid-eshop:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^sid_key$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
