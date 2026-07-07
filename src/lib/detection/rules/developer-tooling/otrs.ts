import type { TechnologyDefinition } from '../../types';

export const otrsTechnologyDefinition = {
	id: "otrs",
	name: "otrs",
	website: "https://www.otrs.com",
	icon: "otrs.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "otrs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/otrs-web\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "otrs:html:1",
			kind: "html",
			pattern: new RegExp("<!--\\s+OTRS: Copyright"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "otrs:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("OTRS ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "otrs:html:3",
			kind: "html",
			pattern: new RegExp("<!--\\s+otrs: copyright"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "otrs:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("otrs ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:otrs:otrs:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
