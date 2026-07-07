import type { TechnologyDefinition } from '../../types';

export const zenbasketTechnologyDefinition = {
	id: "zenbasket",
	name: "ZenBasket",
	website: "https://getzenbasket.com",
	description: "ZenBasket is a modern e-commerce website builder that allows users to create, customize, and manage online stores with drag-and-drop features and integrated payment solutions.",
	icon: "ZenBasket.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zenbasket:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.getzenbasket\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zenbasket:url:1",
			kind: "url",
			pattern: new RegExp("^https?\\/\\/.+\\.getzenbasket\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "zenbasket:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("\\.getzenbasket\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "zenbasket:dom:3",
			kind: "dom",
			selector: "img[src*='getzenbasket.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zenbasket:dom:4",
			kind: "dom",
			selector: "link[href*='getzenbasket.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zenbasket:jsGlobal:5",
			kind: "jsGlobal",
			property: "ZenBasket",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zenbasket:jsGlobal:6",
			kind: "jsGlobal",
			property: "ZenBasketApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zenbasket:jsGlobal:7",
			kind: "jsGlobal",
			property: "ZenBasketStore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zenbasket:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^zenbasket_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zenbasket:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ZenBasket", "i"),
			confidence: 50,
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zenbasket:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zenbasket", "i"),
			confidence: 50,
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
