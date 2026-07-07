import type { TechnologyDefinition } from '../../types';

export const seersTechnologyDefinition = {
	id: "seers",
	name: "Seers",
	website: "https://www.seersco.com",
	description: "Seers is a privacy and consent management platform that helps businesses comply with data protection regulations like GDPR, CCPA, and LGPD by providing tools for cookie consent, data anonymization, and GDPR training​.",
	icon: "seersco.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "seers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("seersco.com\\/script\\/cb\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seers:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/\\/|\\.)seersco\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seers:jsGlobal:2",
			kind: "jsGlobal",
			property: "cb_banner_cpra_file_name",
			valuePattern: new RegExp("\\.seersco\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seers:jsGlobal:3",
			kind: "jsGlobal",
			property: "cb_host",
			valuePattern: new RegExp("\\.seersco\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
