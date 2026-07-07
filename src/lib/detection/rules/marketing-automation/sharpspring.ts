import type { TechnologyDefinition } from '../../types';

export const sharpspringTechnologyDefinition = {
	id: "sharpspring",
	name: "SharpSpring",
	website: "https://sharpspring.com",
	description: "SharpSpring is a cloud-based marketing tool that offers customer relationship management, marketing automation, mobile and social marketing, sales team automation, customer service and more, all within one solution.",
	icon: "SharpSpring.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sharpspring:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.marketingautomation\\.services.+(?:ver=)([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharpspring:jsGlobal:1",
			kind: "jsGlobal",
			property: "sharpspring_tracking_installed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
