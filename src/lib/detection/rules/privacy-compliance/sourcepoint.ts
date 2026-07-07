import type { TechnologyDefinition } from '../../types';

export const sourcepointTechnologyDefinition = {
	id: "sourcepoint",
	name: "Sourcepoint",
	website: "https://sourcepoint.com",
	description: "Sourcepoint is the data privacy software company for the digital marketing ecosystem.",
	icon: "Sourcepoint.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "sourcepoint:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("SOURCEPOINT_MMS_DOMAIN"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sourcepoint:dom:1",
			kind: "dom",
			selector: "body.f_sourcepoint_ccpa_on",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sourcepoint:jsGlobal:2",
			kind: "jsGlobal",
			property: "tealium_sourcepoint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sourcepoint:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_sp_enable_dfp_personalized_ads$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sourcepoint:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("sourcepoint_mms_domain"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
