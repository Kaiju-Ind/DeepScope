import type { TechnologyDefinition } from '../../types';

export const speedcurveTechnologyDefinition = {
	id: "speedcurve",
	name: "SpeedCurve",
	website: "https://www.speedcurve.com",
	description: "SpeedCurve is a front-end performance monitoring service.",
	icon: "SpeedCurve.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "speedcurve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.speedcurve\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "speedcurve:jsGlobal:1",
			kind: "jsGlobal",
			property: "LUX.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "speedcurve:jsGlobal:2",
			kind: "jsGlobal",
			property: "LUX_t_end",
			valuePattern: new RegExp("\\d+"),
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "speedcurve:jsGlobal:3",
			kind: "jsGlobal",
			property: "LUX_t_start",
			valuePattern: new RegExp("\\d+"),
			confidence: 50,
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
