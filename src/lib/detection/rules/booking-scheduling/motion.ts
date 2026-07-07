import type { TechnologyDefinition } from '../../types';

export const motionTechnologyDefinition = {
	id: "motion",
	name: "Motion",
	website: "https://www.usemotion.com",
	description: "Motion is an AI-powered tool that helps users manage their calendars, meetings, and projects.",
	icon: "Motion.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "motion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("segmentcdn\\.usemotion\\.com\\/next-integrations\\/integrations\\/vendor\\/commons\\.[a-z0-9]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "motion:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.usemotion.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
