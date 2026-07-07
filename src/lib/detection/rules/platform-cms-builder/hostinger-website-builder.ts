import type { TechnologyDefinition } from '../../types';

export const hostingerWebsiteBuilderTechnologyDefinition = {
	id: "hostinger-website-builder",
	name: "Hostinger Website Builder",
	website: "https://www.hostinger.com",
	description: "Hostinger Website Builder is a web-based platform that allows users to create and design websites without needing to write code or have extensive technical knowledge.",
	icon: "Hostinger.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hostinger-website-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("userapp\\.zyrosite\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hostinger-website-builder:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Hostinger Website Builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hostinger-website-builder:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hostinger website builder", "i"),
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
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
