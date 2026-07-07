import type { TechnologyDefinition } from '../../types';

export const workdayTechnologyDefinition = {
	id: "workday",
	name: "Workday",
	website: "https://www.workday.com",
	description: "Workday is an enterprise cloud platform that provides solutions for finance, human resources, and business planning.",
	icon: "Workday.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "workday:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.myworkday\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "workday:jsGlobal:1",
			kind: "jsGlobal",
			property: "workday.appRoot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "workday:jsGlobal:2",
			kind: "jsGlobal",
			property: "workdayMessages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:workday:workday:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
