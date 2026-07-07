import type { TechnologyDefinition } from '../../types';

export const quickblogTechnologyDefinition = {
	id: "quickblog",
	name: "Quickblog",
	website: "https://www.quickblog.co",
	description: "Quickblog is a platform that aids bloggers and agencies in producing embedded, SEO-ready blog content seamlessly compatible with any existing website.",
	icon: "Quickblog.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "quickblog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quickblog\\.co\\/"),
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
