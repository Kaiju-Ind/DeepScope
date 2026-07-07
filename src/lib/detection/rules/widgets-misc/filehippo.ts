import type { TechnologyDefinition } from '../../types';

export const filehippoTechnologyDefinition = {
	id: "filehippo",
	name: "FileHippo",
	website: "https://filehippo.com",
	description: "FileHippo is a widget that provides the latest software updates, allowing users to stay informed about new versions and releases.",
	icon: "FileHippo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "filehippo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.filehippo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
