import type { TechnologyDefinition } from '../../types';

export const cppcmsTechnologyDefinition = {
	id: "cppcms",
	name: "CppCMS",
	website: "https://cppcms.com",
	icon: "CppCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cppcms:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^CppCMS\\/([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cppcms:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^cppcms\\/([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cppcms:cppcms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
