import type { TechnologyDefinition } from '../../types';

export const postDolphinTechnologyDefinition = {
	id: "post-dolphin",
	name: "Post Dolphin",
	website: "https://metashop.dolphinsuite.com",
	description: "Post Dolphin is a social media management platform that plans, schedules, automates, and synchronizes social content across multiple channels.",
	icon: "PostDolphin.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "post-dolphin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("metashop\\.dolphinsuite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "post-dolphin:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("metashop\\.dolphinsuite\\.com"),
			description: "Script content contains a bounded technology signature.",
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
