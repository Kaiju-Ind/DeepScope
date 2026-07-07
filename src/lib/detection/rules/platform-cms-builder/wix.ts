import type { TechnologyDefinition } from '../../types';

export const wixTechnologyDefinition = {
	id: "wix",
	name: "Wix",
	website: "https://www.wix.com",
	description: "Wix provides cloud-based web development services, allowing users to create HTML5 websites and mobile sites.",
	icon: "Wix.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "wix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.parastorage\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wix:jsGlobal:1",
			kind: "jsGlobal",
			property: "wixBiSession",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wix:jsGlobal:2",
			kind: "jsGlobal",
			property: "wixPerformanceMeasurements",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wix:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Wix\\.com Website Builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wix:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("wix\\.com website builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wix:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.wix\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "wix:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.wixsite\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "wix:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("\\.wixstatic\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "wix:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("static\\.parastorage\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "wix:header:modern:4",
			kind: "header",
			key: "x-wix-request-id",
			valuePattern: new RegExp(".+"),
			confidence: 55,
			description: "HTTP response header matches a modern tooling marker.",
		},
		{
			id: "wix:header:modern:5",
			kind: "header",
			key: "x-wix-server-artifact-id",
			valuePattern: new RegExp(".+"),
			confidence: 55,
			description: "HTTP response header matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
