import type { TechnologyDefinition } from '../../types';

export const linkedinAdsTechnologyDefinition = {
	id: "linkedin-ads",
	name: "Linkedin Ads",
	website: "https://business.linkedin.com/marketing-solutions/ads",
	description: "Linkedin Ads is a paid marketing tool that offers access to Linkedin social networks through various sponsored posts and other methods.",
	icon: "Linkedin.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "linkedin-ads:html:0",
			kind: "html",
			pattern: new RegExp("<img [^>]*src=\"[^/]*\\/\\/[^/]*px\\.ads\\.linkedin\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "linkedin-ads:dom:1",
			kind: "dom",
			selector: "img[src*='dc.ads.linkedin.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "linkedin-ads:dom:2",
			kind: "dom",
			selector: "link[href*='px.ads.linkedin.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "linkedin-ads:header:3",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("px\\.ads\\.linkedin\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "linkedin-ads:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("px\\.ads\\.linkedin\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
