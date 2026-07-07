import type { TechnologyDefinition } from '../../types';

export const vfairsTechnologyDefinition = {
	id: "vfairs",
	name: "vFairs",
	website: "https://www.vfairs.com",
	description: "vFairs is an event management platform for organizing customizable in-person and virtual events.",
	icon: "vFairs.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vfairs:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("vfairs\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "vfairs:dom:1",
			kind: "dom",
			selector: "scripts[data-domain*='vfairscombined.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:vfairs:vfairs:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
