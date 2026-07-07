import type { TechnologyDefinition } from '../../types';

export const laterpayTechnologyDefinition = {
	id: "laterpay",
	name: "Laterpay",
	website: "https://www.laterpay.net/",
	description: "Laterpay is a service that simplifies payments on the Internet. In addition to the classic immediate purchase option, Laterpay also allows you to buy digital content such as articles or videos now and pay later.",
	icon: "laterpay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "laterpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/connectormwi\\.laterpay\\.net\\/([0-9.]+)[a-zA-z-]*\\/live\\/[\\w-]+\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "laterpay:meta:1",
			kind: "meta",
			key: "laterpay:connector:callbacks:on_user_has_access",
			valuePattern: new RegExp("deobfuscateText", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "laterpay:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/connectormwi\\.laterpay\\.net\\/([0-9.]+)[a-za-z-]*\\/live\\/[\\w-]+\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "laterpay:meta:3",
			kind: "meta",
			key: "laterpay:connector:callbacks:on_user_has_access",
			valuePattern: new RegExp("deobfuscatetext", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
