import type { TechnologyDefinition } from '../../types';

export const opencmsTechnologyDefinition = {
	id: "opencms",
	name: "OpenCms",
	website: "https://www.opencms.org",
	icon: "OpenCms.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opencms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("opencms"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "opencms:html:1",
			kind: "html",
			pattern: new RegExp("<link href=\"\\/opencms\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "opencms:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("OpenCms", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "opencms:dom:3",
			kind: "dom",
			selector: "link[href^='/opencms/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "opencms:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("opencms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:alkacon:opencms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
