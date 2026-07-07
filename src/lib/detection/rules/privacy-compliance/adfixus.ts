import type { TechnologyDefinition } from '../../types';

export const adfixusTechnologyDefinition = {
	id: "adfixus",
	name: "AdFixus",
	website: "https://www.adfixus.com",
	description: "AdFixus is a privacy-focused solution that enables businesses to manage their data and empower individuals with consent control, addressing the decline of third-party cookies.",
	icon: "AdFixus.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "adfixus:jsGlobal:0",
			kind: "jsGlobal",
			property: "AfxIdentity",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfixus:jsGlobal:1",
			kind: "jsGlobal",
			property: "_afxProfile",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfixus:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^afx_profile_hs$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
