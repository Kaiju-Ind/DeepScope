import type { TechnologyDefinition } from '../../types';

export const arloTechnologyDefinition = {
	id: "arlo",
	name: "Arlo",
	website: "https://www.arlo.co",
	description: "Arlo is an event management tool that helps organize, schedule, and track events.",
	icon: "Arlo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "arlo:jsGlobal:0",
			kind: "jsGlobal",
			property: "ArloST.apiClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arlo:jsGlobal:1",
			kind: "jsGlobal",
			property: "ArloStarterTemplate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arlo:header:2",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.arlocdn\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arlo:header:3",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.arlocdn\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
