import type { TechnologyDefinition } from '../../types';

export const sassySocialShareTechnologyDefinition = {
	id: "sassy-social-share",
	name: "Sassy Social Share",
	website: "https://wordpress.org/plugins/sassy-social-share",
	description: "Sassy Social Share allows your website visitors to share your content over Facebook, Twitter, Google, Linkedin, Whatsapp, Tumblr, Pinterest, Reddit, Gab, Gettr and over 110 more social sharing and bookmarking services.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "sassy-social-share:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sassy-social-share(?:-public)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sassy-social-share:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/sassy-social-share/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
