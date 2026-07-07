import type { TechnologyDefinition } from '../../types';

export const acuitySchedulingTechnologyDefinition = {
	id: "acuity-scheduling",
	name: "Acuity Scheduling",
	website: "https://acuityscheduling.com",
	description: "Acuity Scheduling is a cloud-based appointment scheduling software solution.",
	icon: "Acuity Scheduling.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "acuity-scheduling:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.acuityscheduling\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acuity-scheduling:dom:1",
			kind: "dom",
			selector: "a[href*='app.acuityscheduling.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acuity-scheduling:jsGlobal:2",
			kind: "jsGlobal",
			property: "ACUITY_MODAL_INIT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acuity-scheduling:dom:3",
			kind: "dom",
			selector: "iframe[src*='app.acuityscheduling.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acuity-scheduling:dom:4",
			kind: "dom",
			selector: "a[href*='.acuityscheduling.com/schedule.php'], iframe[src*='.acuityscheduling.com/schedule.php']",
			description: "DOM selector matches a known technology marker.",
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
