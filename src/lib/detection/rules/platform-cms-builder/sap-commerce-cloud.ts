import type { TechnologyDefinition } from '../../types';

export const sapCommerceCloudTechnologyDefinition = {
	id: "sap-commerce-cloud",
	name: "SAP Commerce Cloud",
	website: "https://www.sap.com/products/commerce-cloud.html",
	description: "SAP Commerce Cloud is a cloud-native omnichannel commerce solution for B2B, B2C, and B2B2C companies.",
	icon: "SAP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sap-commerce-cloud:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+\\/(?:sys_master|hybr|_ui\\/(?:.*responsive\\/)?(?:desktop|common(?:\\/images|\\/img|\\/css|ico)?))\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sap-commerce-cloud:html:1",
			kind: "html",
			pattern: new RegExp("<script[^>].*hybris.*.js"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:2",
			kind: "jsGlobal",
			property: "ACC.config.commonResourcePath",
			valuePattern: new RegExp("\\/_ui\\/responsive\\/common"),
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:3",
			kind: "jsGlobal",
			property: "ACC.config.rootPath",
			valuePattern: new RegExp("\\/_ui\\/responsive"),
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:4",
			kind: "jsGlobal",
			property: "ACC.config.themeResourcePath",
			valuePattern: new RegExp("\\/_ui\\/responsive\\/theme-"),
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:5",
			kind: "jsGlobal",
			property: "getProductAttrFromHybris",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:6",
			kind: "jsGlobal",
			property: "getProductAvailabilityHybris",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:7",
			kind: "jsGlobal",
			property: "hybrisId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:8",
			kind: "jsGlobal",
			property: "passLgDataToHybris",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:jsGlobal:9",
			kind: "jsGlobal",
			property: "smartedit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^_hybris$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:dom:11",
			kind: "dom",
			selector: "script[src*='hybris.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:dom:12",
			kind: "dom",
			selector: "div[class*='yCmsContentSlot']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:dom:13",
			kind: "dom",
			selector: "footer[cxskiplink*='cx-footer'] > [cx-page-layout]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sap-commerce-cloud:dom:14",
			kind: "dom",
			selector: "script[src*='hybris.js'], div[class*='yCmsContentSlot'], footer[cxskiplink*='cx-footer'] > [cx-page-layout]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:sap:commerce_cloud:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
