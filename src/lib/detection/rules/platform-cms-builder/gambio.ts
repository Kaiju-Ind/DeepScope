import type { TechnologyDefinition } from '../../types';

export const gambioTechnologyDefinition = {
	id: "gambio",
	name: "Gambio",
	website: "https://gambio.de",
	description: "Gambio is an all-in-one shopping cart solution for small to medium sized businesses.",
	icon: "Gambio.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gambio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gm_javascript\\.js\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gambio:html:1",
			kind: "html",
			pattern: new RegExp("(?:<link[^>]* href=\"templates\\/gambio\\/|<a[^>]content\\.php\\?coID=\\d|<!-- gambio eof -->|<!--[\\s=]+Shopsoftware by Gambio GmbH \\(c\\))"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gambio:jsGlobal:2",
			kind: "jsGlobal",
			property: "gambio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gambio:dom:3",
			kind: "dom",
			selector: "link[href*='templates/gambio/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gambio:html:4",
			kind: "html",
			pattern: new RegExp("(?:<link[^>]* href=\"templates\\/gambio\\/|<a[^>]content\\.php\\?coid=\\d|<!-- gambio eof -->|<!--[\\s=]+shopsoftware by gambio gmbh \\(c\\))"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gambio:gambio:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
