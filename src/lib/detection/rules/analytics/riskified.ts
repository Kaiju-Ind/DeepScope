import type { TechnologyDefinition } from '../../types';

export const riskifiedTechnologyDefinition = {
	id: "riskified",
	name: "Riskified",
	website: "https://www.riskified.com/",
	description: "Riskified is a privately held company that provides SaaS fraud and chargeback prevention technology.",
	icon: "Riskified.svg",
	categories: [
		"analytics",
		"security",
	],
	rules: [
		{
			id: "riskified:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]*beacon\\.riskified\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "riskified:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]*c\\.riskified\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "riskified:jsGlobal:2",
			kind: "jsGlobal",
			property: "RISKX",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "riskified:jsGlobal:3",
			kind: "jsGlobal",
			property: "riskifiedBeaconLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "riskified:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Riskified Server", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "riskified:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("\\.riskified\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "riskified:header:6",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("riskified server", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
