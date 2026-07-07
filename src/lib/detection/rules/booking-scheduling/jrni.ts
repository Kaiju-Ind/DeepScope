import type { TechnologyDefinition } from '../../types';

export const jrniTechnologyDefinition = {
	id: "jrni",
	name: "jrni",
	website: "https://www.jrni.com",
	description: "jrni is a platform that supports customer revenue generation by centralizing booking, scheduling, and customer engagement processes within a single system.",
	icon: "jrni.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "jrni:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bookingbug\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jrni:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.jrni\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
