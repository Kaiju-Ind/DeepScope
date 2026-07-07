import type { TechnologyDefinition } from '../../types';

export const vwoTechnologyDefinition = {
	id: "vwo",
	name: "VWO",
	website: "https://vwo.com",
	description: "VWO is a website testing and conversion optimisation platform.",
	icon: "VWO.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "vwo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dev\\.visualwebsiteoptimizer\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vwo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/visual-website-optimizer\\/([\\d\\.])"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vwo:jsGlobal:2",
			kind: "jsGlobal",
			property: "VWO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vwo:jsGlobal:3",
			kind: "jsGlobal",
			property: "__vwo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vwo:jsGlobal:4",
			kind: "jsGlobal",
			property: "_vwo_code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vwo:jsGlobal:5",
			kind: "jsGlobal",
			property: "_vwo_settings_timer",
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
