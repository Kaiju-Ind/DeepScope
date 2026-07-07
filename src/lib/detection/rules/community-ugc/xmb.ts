import type { TechnologyDefinition } from '../../types';

export const xmbTechnologyDefinition = {
	id: "xmb",
	name: "XMB",
	website: "https://www.xmbforum.com",
	icon: "XMB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "xmb:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Powered by XMB"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xmb:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^xmblva$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "xmb:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^xmblvb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "xmb:html:3",
			kind: "html",
			pattern: new RegExp("<!-- powered by xmb"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
