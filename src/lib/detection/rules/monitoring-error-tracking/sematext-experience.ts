import type { TechnologyDefinition } from '../../types';

export const sematextExperienceTechnologyDefinition = {
	id: "sematext-experience",
	name: "Sematext Experience",
	website: "https://sematext.com/experience",
	description: "Sematext Experience for Real User Monitoring Analyze data collected from real-user sessions, detect anomalies, send alerts in real-time, and enhance overall customer digital experience.",
	icon: "Sematext.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "sematext-experience:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sematext\\.com\\/experience\\.js"),
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
} as const satisfies TechnologyDefinition;
