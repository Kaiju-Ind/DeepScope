import type { TechnologyDefinition } from '../../types';

export const adoptTechnologyDefinition = {
	id: "adopt",
	name: "AdOpt",
	website: "https://goadopt.io",
	description: "AdOpt is a consent tool that prioritises privacy and usability towards the LGPD.",
	icon: "AdOpt.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "adopt:jsGlobal:0",
			kind: "jsGlobal",
			property: "adoptApp.domain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adopt:jsGlobal:1",
			kind: "jsGlobal",
			property: "adopt_website_code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adopt:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.goadopt\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"svelte",
	],
} as const satisfies TechnologyDefinition;
