import type { TechnologyDefinition } from '../../types';

export const ultracartTechnologyDefinition = {
	id: "ultracart",
	name: "UltraCart",
	website: "https://ultracart.com",
	description: "UltraCart is an ecommerce platform offering shopping cart and payment processing solutions for online stores.",
	icon: "UltraCart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ultracart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cgi-bin\\/UCJavaScript\\?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ultracart:html:1",
			kind: "html",
			pattern: new RegExp("<form [^>]*action=\"[^\"]*\\/cgi-bin\\/UCEditor\\?(?:[^\"]*&)?merchantId=[^\"]"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ultracart:url:2",
			kind: "url",
			pattern: new RegExp("\\/cgi-bin\\/UCEditor\\?"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "ultracart:jsGlobal:3",
			kind: "jsGlobal",
			property: "ucCatalog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ultracart:dom:4",
			kind: "dom",
			selector: "a[href*='/cgi-bin/UCEditor?merchantId']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ultracart:jsGlobal:5",
			kind: "jsGlobal",
			property: "ultracart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ultracart:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("cgi-bin\\/ucjavascript\\?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ultracart:html:7",
			kind: "html",
			pattern: new RegExp("<form [^>]*action=\"[^\"]*\\/cgi-bin\\/uceditor\\?(?:[^\"]*&)?merchantid=[^\"]"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
