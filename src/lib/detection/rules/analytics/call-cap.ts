import type { TechnologyDefinition } from '../../types';

export const callCapTechnologyDefinition = {
	id: "call-cap",
	name: "Call Cap",
	website: "https://www.marchex.com/callcap",
	description: "Call Cap is a tool used for tracking and monitoring phone calls.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "call-cap:jsGlobal:0",
			kind: "jsGlobal",
			property: "Callcap.data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "call-cap:jsGlobal:1",
			kind: "jsGlobal",
			property: "callcap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "call-cap:jsGlobal:2",
			kind: "jsGlobal",
			property: "callcap_webmatch_callback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
