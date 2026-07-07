import type { TechnologyDefinition } from '../../types';

export const dynatraceRumTechnologyDefinition = {
	id: "dynatrace-rum",
	name: "Dynatrace RUM",
	website: "https://www.dynatrace.com/platform/real-user-monitoring",
	description: "Dynatrace RUM is an AI powered, full stack, automated real user monitoring platform built by Dynatrace.",
	icon: "Dynatrace.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "dynatrace-rum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ruxitagentjs_(?:.+)_(?:.+)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"dynatrace",
	],
} as const satisfies TechnologyDefinition;
