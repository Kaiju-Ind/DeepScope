import type { TechnologyDefinition } from '../../types';

export const marketpathCmsTechnologyDefinition = {
	id: "marketpath-cms",
	name: "Marketpath CMS",
	website: "https://www.marketpath.com",
	description: "Marketpath CMS is a hosted website content management system used by businesses, churches and schools.",
	icon: "Marketpath CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "marketpath-cms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_mp_permissions$", "i"),
			description: "Cookie name matches a known technology marker.",
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
	implies: [
		"azure",
		"zurb-foundation",
	],
} as const satisfies TechnologyDefinition;
