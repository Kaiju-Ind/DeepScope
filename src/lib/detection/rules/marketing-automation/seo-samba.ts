import type { TechnologyDefinition } from '../../types';

export const seoSambaTechnologyDefinition = {
	id: "seo-samba",
	name: "SEO Samba",
	website: "https://www.seosamba.com",
	description: "SEO Samba is a marketing automation solution designed for franchises and enterprises.",
	icon: "SEOSamba.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seo-samba:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sa\\.seosamba\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seo-samba:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("sa\\.seosamba\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
