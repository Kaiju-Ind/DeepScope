import type { TechnologyDefinition } from '../../types';

export const addtoanyShareButtonsTechnologyDefinition = {
	id: "addtoany-share-buttons",
	name: "AddToAny Share Buttons",
	website: "https://github.com/projectestac/wordpress-add-to-any",
	description: "AddToAny Share Buttons plugin for WordPress increases traffic and engagement by helping people share your posts and pages to any service.",
	icon: "AddToAny.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "addtoany-share-buttons:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/add-to-any/.",
		},
		{
			id: "addtoany-share-buttons:resourceUrl:1",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/add-to-any/.",
		},
		{
			id: "addtoany-share-buttons:html:2",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/add\\-to\\-any/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/add-to-any/.",
		},
		{
			id: "addtoany-share-buttons:dom:3",
			kind: "dom",
			selector: ".addtoany_share_save_container, .addtoany_content, .a2a_kit, script[src*='static.addtoany.com/menu/page.js']",
			description: "DOM selector matches AddToAny share kit markup or menu script markers.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"addtoany",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
