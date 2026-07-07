import type { TechnologyDefinition } from '../../types';

export const mailerliteWebsiteBuilderTechnologyDefinition = {
	id: "mailerlite-website-builder",
	name: "MailerLite Website Builder",
	website: "https://www.mailerlite.com/features/website-builder",
	description: "MailerLite Website Builder is a free drag & drop website builder with interactive blocks and ecommerce integrations.",
	icon: "MailerLite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mailerlite-website-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mailerlite\\.com\\/moment\\/moment\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"caddy",
		"go",
		"mailerlite",
	],
} as const satisfies TechnologyDefinition;
