import type { TechnologyDefinition } from '../../types';

export const contentsTechnologyDefinition = {
	id: "contents",
	name: "Contents",
	website: "https://www.contents.com",
	description: "Contents is a generative AI platform that enables businesses to produce high-performing, original, and SEO-optimized content.",
	icon: "Contents.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contents:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.contents\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
