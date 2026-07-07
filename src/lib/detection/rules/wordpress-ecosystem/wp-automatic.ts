import type { TechnologyDefinition } from '../../types';

export const wpAutomaticTechnologyDefinition = {
	id: "wp-automatic",
	name: "WP Automatic",
	website: "https://wpautomatic.com",
	description: "WP Automatic is a WordPress plugin that automates the process of creating posts on your WordPress site by automatically fetching content from various sources like RSS feeds, Amazon, eBay, ClickBank, and more.",
	icon: "WP Automatic.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-automatic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-automatic\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
