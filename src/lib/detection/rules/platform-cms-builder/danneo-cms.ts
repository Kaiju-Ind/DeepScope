import type { TechnologyDefinition } from '../../types';

export const danneoCmsTechnologyDefinition = {
	id: "danneo-cms",
	name: "Danneo CMS",
	website: "https://danneo.ru/",
	icon: "Danneo CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "danneo-cms:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("CMS Danneo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "danneo-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Danneo CMS ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "danneo-cms:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("cms danneo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "danneo-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("danneo cms ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:danneo:danneo_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
