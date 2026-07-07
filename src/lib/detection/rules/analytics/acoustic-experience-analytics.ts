import type { TechnologyDefinition } from '../../types';

export const acousticExperienceAnalyticsTechnologyDefinition = {
	id: "acoustic-experience-analytics",
	name: "Acoustic Experience Analytics",
	website: "https://acoustic.com/tealeaf",
	description: "Acoustic Experience Analytics (Tealeaf), formerly known as IBM Tealeaf Customer Experience on Cloud, is a SaaS-based analytics solution that delivers Tealeaf core capabilities in an managed cloud environment. Tealeaf captures and manages each visitor interaction on your website and mobile applications.",
	icon: "Acoustic.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "acoustic-experience-analytics:jsGlobal:0",
			kind: "jsGlobal",
			property: "TLT.config.core.modules.TLCookie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acoustic-experience-analytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "TLT_VERSION",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acoustic-experience-analytics:jsGlobal:2",
			kind: "jsGlobal",
			property: "TeaLeaf",
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
