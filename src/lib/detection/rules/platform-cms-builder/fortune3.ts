import type { TechnologyDefinition } from '../../types';

export const fortune3TechnologyDefinition = {
	id: "fortune3",
	name: "Fortune3",
	website: "https://fortune3.com",
	description: "Fortune3 is a platform that offers ecommerce software and services.",
	icon: "Fortune3.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fortune3:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cartjs\\.php\\?(?:.*&)?s=[^&]*myfortune3cart\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fortune3:html:1",
			kind: "html",
			pattern: new RegExp("(?:<link [^>]*href=\"[^\\/]*\\/\\/www\\.fortune3\\.com\\/[^\"]*siterate\\/rate\\.css|Powered by <a [^>]*href=\"[^\"]+fortune3\\.com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fortune3:dom:2",
			kind: "dom",
			selector: "link[href*='//www.fortune3.com/'],link[href*='siterate/rate.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fortune3:html:3",
			kind: "html",
			pattern: new RegExp("(?:<link [^>]*href=\"[^\\/]*\\/\\/www\\.fortune3\\.com\\/[^\"]*siterate\\/rate\\.css|powered by <a [^>]*href=\"[^\"]+fortune3\\.com)"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
