import type { TechnologyDefinition } from '../../types';

export const boldgridTechnologyDefinition = {
	id: "boldgrid",
	name: "BoldGrid",
	website: "https://boldgrid.com",
	description: "BoldGrid is a free website builder for WordPress websites.",
	categories: [
		"platform-cms-builder",
		"content-publishing",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "boldgrid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/post-and-page-builder"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boldgrid:html:1",
			kind: "html",
			pattern: new RegExp("<link rel=[\"']stylesheet[\"'] [^>]+boldgrid"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "boldgrid:html:2",
			kind: "html",
			pattern: new RegExp("<link rel=[\"']stylesheet[\"'] [^>]+post-and-page-builder"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "boldgrid:html:3",
			kind: "html",
			pattern: new RegExp("<link[^>]+s\\d+\\.boldgrid\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "boldgrid:dom:4",
			kind: "dom",
			selector: "link[rel='stylesheet'][href*='boldgrid'], link[rel='stylesheet'][href*='post-and-page-builder'], link[href*='.boldgrid.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
