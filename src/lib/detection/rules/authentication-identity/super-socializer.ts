import type { TechnologyDefinition } from '../../types';

export const superSocializerTechnologyDefinition = {
	id: "super-socializer",
	name: "Super Socializer",
	website: "https://super-socializer-wordpress.heateor.com",
	description: "Super Socializer is a multipurpose social media plugin for WordPress.",
	icon: "Super Socializer.png",
	categories: [
		"authentication-identity",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "super-socializer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plugins\\/super-socializer\\/.+?ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:heateor:super_socializer:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
