import type { TechnologyDefinition } from '../../types';

export const bannerbooTechnologyDefinition = {
	id: "bannerboo",
	name: "BannerBoo",
	website: "https://bannerboo.com",
	description: "BannerBoo is a graphic design software that enables users to create display banners in various sizes.",
	icon: "BannerBoo.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "bannerboo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bannerboo\\.com\\/"),
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
} as const satisfies TechnologyDefinition;
