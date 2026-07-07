import type { TechnologyDefinition } from '../../types';

export const mazeedTechnologyDefinition = {
	id: "mazeed",
	name: "Mazeed+",
	website: "https://mazeedplus.com",
	description: "Mazeed+ is a platform that uses artificial intelligence to personalize and display targeted offers to website visitors based on user behavior and engagement.",
	icon: "Mazeed+.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "mazeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk-cdn\\.mazeedplus\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
