import type { TechnologyDefinition } from '../../types';

export const cssuseragentTechnologyDefinition = {
	id: "cssuseragent",
	name: "CssUserAgent",
	website: "https://cssuseragent.org",
	description: "CssUserAgent is a tool that applies special CSS classes to web pages, allowing conditional styling based on user agent, browser, device, or environment.",
	icon: "CssUserAgent.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "cssuseragent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cssua\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
