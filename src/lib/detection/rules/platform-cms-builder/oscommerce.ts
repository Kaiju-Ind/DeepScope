import type { TechnologyDefinition } from '../../types';

export const oscommerceTechnologyDefinition = {
	id: "oscommerce",
	name: "osCommerce",
	website: "https://www.oscommerce.com",
	description: "OsCommerce is an open-source ecommerce and online store-management software program​.",
	icon: "osCommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oscommerce:html:0",
			kind: "html",
			pattern: new RegExp("<br \\/>Powered by <a href=\"https?:\\/\\/www\\.oscommerce\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:html:1",
			kind: "html",
			pattern: new RegExp("<(?:input|a)[^>]+name=\"osCsid\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:html:2",
			kind: "html",
			pattern: new RegExp("<(?:tr|td|table)class=\"[^\"]*infoBoxHeading"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^osCsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "oscommerce:dom:4",
			kind: "dom",
			selector: "input[name='osCsid'], a[name='osCsid'], tr.infoBoxHeading, td.infoBoxHeading, table.infoBoxHeading",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oscommerce:html:5",
			kind: "html",
			pattern: new RegExp("<(?:input|a)[^>]+name=\"oscsid\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:html:6",
			kind: "html",
			pattern: new RegExp("<(?:tr|td|table)class=\"[^\"]*infoboxheading"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:html:7",
			kind: "html",
			pattern: new RegExp("<br \\/>powered by <a href=\"https?:\\/\\/www\\.oscommerce\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oscommerce:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^oscsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:oscommerce:oscommerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
