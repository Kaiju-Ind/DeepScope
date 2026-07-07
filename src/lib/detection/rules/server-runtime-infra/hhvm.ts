import type { TechnologyDefinition } from '../../types';

export const hhvmTechnologyDefinition = {
	id: "hhvm",
	name: "HHVM",
	website: "https://hhvm.com",
	icon: "HHVM.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hhvm:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("HHVM\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hhvm:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("hhvm\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:facebook:hhvm:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php-confidence-75",
	],
} as const satisfies TechnologyDefinition;
