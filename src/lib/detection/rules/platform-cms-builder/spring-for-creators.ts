import type { TechnologyDefinition } from '../../types';

export const springForCreatorsTechnologyDefinition = {
	id: "spring-for-creators",
	name: "Spring for creators",
	website: "https://www.spri.ng",
	description: "Spring for creators (formerly Teespring) is a creator-centric social ecommerce platform.",
	icon: "Spring for creators.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spring-for-creators:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.creator-spring\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spring-for-creators:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpteespring-custom-storefront",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spring-for-creators:dom:2",
			kind: "dom",
			selector: "link[href*='teespring.com/'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spring-for-creators:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_teespring_session_5$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
