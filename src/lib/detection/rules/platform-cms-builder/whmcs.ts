import type { TechnologyDefinition } from '../../types';

export const whmcsTechnologyDefinition = {
	id: "whmcs",
	name: "WHMCS",
	website: "https://www.whmcs.com",
	description: "WHMCS is an automation platform that simplifies and automates all aspects of operating an online web hosting and domain registrar business.",
	icon: "WHMCS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "whmcs:jsGlobal:0",
			kind: "jsGlobal",
			property: "WHMCS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:whmcs:whmcs:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
