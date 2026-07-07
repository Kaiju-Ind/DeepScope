import type { TechnologyDefinition } from '../../types';

export const oracleBluekaiTechnologyDefinition = {
	id: "oracle-bluekai",
	name: "Oracle BlueKai",
	website: "https://www.oracle.com/cx/marketing/data-management-platform",
	description: "Oracle BlueKai is a cloud-based big data platform that enables companies to personalise online, offline, and mobile marketing campaigns.",
	icon: "Oracle.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "oracle-bluekai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tags\\.(?:bluekai|bkrtx)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oracle-bluekai:dom:1",
			kind: "dom",
			selector: "link[href*='tags.bluekai.com'],link[href*='tags.bkrtx.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oracle-bluekai:jsGlobal:2",
			kind: "jsGlobal",
			property: "bluekaiLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
