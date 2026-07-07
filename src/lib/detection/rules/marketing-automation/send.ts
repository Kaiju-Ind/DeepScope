import type { TechnologyDefinition } from '../../types';

export const sendTechnologyDefinition = {
	id: "send",
	name: "Send",
	website: "https://send2.co/",
	description: "Send is a marketing platform built for WordPress, providing tools to manage campaigns, track performance, and engage audiences within the WordPress ecosystem.",
	icon: "Send.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "send:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/send-app\\/assets\\/js\\/.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
