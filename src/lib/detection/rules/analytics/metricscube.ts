import type { TechnologyDefinition } from '../../types';

export const metricscubeTechnologyDefinition = {
	id: "metricscube",
	name: "MetricsCube",
	website: "https://www.metricscube.io",
	description: "MetricsCube is a WHMCS-integrated business analysis platform, offering real-time stats and reports.",
	icon: "MetricsCube.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "metricscube:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.metricscube\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metricscube:dom:1",
			kind: "dom",
			selector: "script#metricscubestats",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "metricscube:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^METRICSCUBE_ANALITYCS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "metricscube:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^metricscube_analitycs$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
