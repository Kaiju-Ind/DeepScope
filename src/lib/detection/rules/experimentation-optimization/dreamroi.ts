import type { TechnologyDefinition } from '../../types';

export const dreamroiTechnologyDefinition = {
	id: "dreamroi",
	name: "DreamROI",
	website: "https://www.dreamroi.com",
	description: "DreamROI is a content personalization system for eCommerce that tailors on-site experiences based on user behavior and product interactions.",
	icon: "DreamROI.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "dreamroi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.dreamroi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dreamroi:jsGlobal:1",
			kind: "jsGlobal",
			property: "dreamroibox.refresh",
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
