import type { TechnologyDefinition } from '../../types';

export const rampInteractiveTechnologyDefinition = {
	id: "ramp-interactive",
	name: "RAMP Interactive",
	website: "https://rampinteractive.com",
	description: "RAMP Interactive is a sports website management tool that enables organizations to create, update, and maintain team websites, schedules, registrations, and related content through a centralized online platform.",
	icon: "RAMPInteractive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ramp-interactive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.rampinteractive\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ramp-interactive:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("RAMPInterActive\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
