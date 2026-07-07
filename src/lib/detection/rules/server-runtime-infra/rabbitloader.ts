import type { TechnologyDefinition } from '../../types';

export const rabbitloaderTechnologyDefinition = {
	id: "rabbitloader",
	name: "RabbitLoader",
	website: "https://rabbitloader.com",
	description: "RabbitLoader is a plugin designed to enhance PageSpeed Insights Score by addressing Core Web Vitals issues including FID, LCP, & CLS.",
	icon: "RabbitLoader.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "rabbitloader:dom:0",
			kind: "dom",
			selector: "link[href*='cfw.rabbitloader.xyz']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
