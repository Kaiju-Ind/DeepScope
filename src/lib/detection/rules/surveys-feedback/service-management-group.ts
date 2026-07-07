import type { TechnologyDefinition } from '../../types';

export const serviceManagementGroupTechnologyDefinition = {
	id: "service-management-group",
	name: "Service Management Group",
	website: "https://www.smg.com",
	description: "Service Management Group offers customer experience measurement, employee engagement, social monitoring, publishing, and brand research services.",
	icon: "Service Management Group.png",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "service-management-group:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smg\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "service-management-group:dom:1",
			kind: "dom",
			selector: "link[href*='api.smg.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "service-management-group:jsGlobal:2",
			kind: "jsGlobal",
			property: "smgETrackParams",
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
