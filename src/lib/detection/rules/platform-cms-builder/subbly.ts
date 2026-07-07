import type { TechnologyDefinition } from '../../types';

export const subblyTechnologyDefinition = {
	id: "subbly",
	name: "Subbly",
	website: "https://www.subbly.co",
	description: "Subbly is a web-based subscription ecommerce platform designed to help businesses build websites, enhance marketing automation, create coupon and discount codes and manage customers.",
	icon: "Subbly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "subbly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.subbly\\.me\\/assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "subbly:jsGlobal:1",
			kind: "jsGlobal",
			property: "subblyProductUrlBase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "subbly:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Subbly$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "subbly:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^subbly$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
