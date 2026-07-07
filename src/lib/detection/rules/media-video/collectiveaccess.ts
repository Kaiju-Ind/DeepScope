import type { TechnologyDefinition } from '../../types';

export const collectiveaccessTechnologyDefinition = {
	id: "collectiveaccess",
	name: "CollectiveAccess",
	website: "https://collectiveaccess.org",
	description: "CollectiveAccess is a free, open-source software for cataloguing and publishing museum and archival collections.",
	icon: "CollectiveAccess.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "collectiveaccess:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CA_collectiveaccess_ui_locale$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "collectiveaccess:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^collectiveaccess$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "collectiveaccess:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ca_collectiveaccess_ui_locale$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
