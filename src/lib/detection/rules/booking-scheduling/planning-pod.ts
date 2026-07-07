import type { TechnologyDefinition } from '../../types';

export const planningPodTechnologyDefinition = {
	id: "planning-pod",
	name: "Planning Pod",
	website: "https://www.planningpod.com",
	description: "Planning Pod is an all-in-one event management software offering integrated online solutions for planning, organizing, and executing events.",
	icon: "PlanningPod.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "planning-pod:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("run\\.planningpod\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
