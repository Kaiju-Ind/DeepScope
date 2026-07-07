import type { TechnologyDefinition } from '../../types';

export const vpAspTechnologyDefinition = {
	id: "vp-asp",
	name: "VP-ASP",
	website: "https://www.vpasp.com",
	icon: "VP-ASP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vp-asp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vs350\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vp-asp:html:1",
			kind: "html",
			pattern: new RegExp("<a[^>]+>Powered By VP-ASP Shopping Cart<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vp-asp:html:2",
			kind: "html",
			pattern: new RegExp("<a[^>]+>powered by vp-asp shopping cart<\\/a>"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
