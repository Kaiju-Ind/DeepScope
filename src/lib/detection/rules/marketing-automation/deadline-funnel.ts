import type { TechnologyDefinition } from '../../types';

export const deadlineFunnelTechnologyDefinition = {
	id: "deadline-funnel",
	name: "Deadline Funnel",
	website: "https://www.deadlinefunnel.com",
	description: "Deadline is a tool used to automate marketing funnels by managing time-based campaigns and creating urgency-driven conversion strategies.",
	icon: "DeadlineFunnel.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "deadline-funnel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("a\\.deadlinefunnel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "deadline-funnel:jsGlobal:1",
			kind: "jsGlobal",
			property: "SendUrlToDeadlineFunnel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "deadline-funnel:jsGlobal:2",
			kind: "jsGlobal",
			property: "afterDeadline",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
