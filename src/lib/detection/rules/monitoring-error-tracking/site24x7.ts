import type { TechnologyDefinition } from '../../types';

export const site24x7TechnologyDefinition = {
	id: "site24x7",
	name: "Site24x7",
	website: "https://www.site24x7.com",
	description: "Site24x7 is a cloud-based website and server monitoring platform.",
	icon: "Site24x7.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "site24x7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.site24x7rum\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "site24x7:jsGlobal:1",
			kind: "jsGlobal",
			property: "S247RumQueueImpl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "site24x7:jsGlobal:2",
			kind: "jsGlobal",
			property: "s247RUM",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "site24x7:jsGlobal:3",
			kind: "jsGlobal",
			property: "site24x7RumError",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "site24x7:jsGlobal:4",
			kind: "jsGlobal",
			property: "site24x7rum",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
