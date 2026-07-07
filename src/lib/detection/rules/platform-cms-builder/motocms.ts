import type { TechnologyDefinition } from '../../types';

export const motocmsTechnologyDefinition = {
	id: "motocms",
	name: "MotoCMS",
	website: "https://motocms.com",
	icon: "MotoCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "motocms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/mt-includes\\/js\\/website(?:assets)?\\.(?:min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "motocms:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^>]*\\/mt-content\\/[^>]*\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "motocms:dom:2",
			kind: "dom",
			selector: "link[href*='/mt-content/assets/styles.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:motocms:motocms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"angularjs",
		"jquery",
		"php",
	],
} as const satisfies TechnologyDefinition;
