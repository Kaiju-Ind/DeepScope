import type { TechnologyDefinition } from '../../types';

export const quantaTechnologyDefinition = {
	id: "quanta",
	name: "Quanta",
	website: "https://www.quanta.io",
	description: "Quanta is web performance management solution. Quanta offers the only analytics solution specifically designed to enable business and technical members of ecommerce teams to collaborate effectively with the end in mind: use web performance to directly impact online revenue at all times.",
	icon: "Quanta.svg",
	categories: [
		"monitoring-error-tracking",
		"analytics",
	],
	rules: [
		{
			id: "quanta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quanta\\.io\\/(?:.+\\/quanta-rum-v([\\d\\.]+)\\.min\\.js)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quanta:jsGlobal:1",
			kind: "jsGlobal",
			property: "QUANTA.app_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quanta:jsGlobal:2",
			kind: "jsGlobal",
			property: "QuantaTagRUMSpeedIndex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quanta:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_qta_rum$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
