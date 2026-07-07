import type { TechnologyDefinition } from '../../types';

export const graspTechnologyDefinition = {
	id: "grasp",
	name: "Grasp",
	website: "https://www.getgrasp.com",
	description: "Grasp is a customer support software company that offers a cloud-based helpdesk and live chat solution for businesses of all sizes.",
	icon: "Grasp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "grasp:jsGlobal:0",
			kind: "jsGlobal",
			property: "CASENGO.widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "grasp:jsGlobal:1",
			kind: "jsGlobal",
			property: "CASENGO_INLINE_COOKIE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "grasp:jsGlobal:2",
			kind: "jsGlobal",
			property: "casengoUpdateWidget",
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
