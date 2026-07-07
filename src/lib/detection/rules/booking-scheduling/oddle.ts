import type { TechnologyDefinition } from '../../types';

export const oddleTechnologyDefinition = {
	id: "oddle",
	name: "Oddle",
	website: "https://oddle.me",
	description: "Oddle is an online ordering system designed to streamline restaurant operations.",
	icon: "Oddle.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "oddle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("oddle-pass-wrapper\\.s3\\.ap-southeast-1"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oddle:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^enableOddlePass$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "oddle:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^enableoddlepass$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
