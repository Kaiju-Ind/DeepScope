import type { TechnologyDefinition } from '../../types';

export const ezPublishTechnologyDefinition = {
	id: "ez-publish",
	name: "eZ Publish",
	website: "https://github.com/ezsystems/ezpublish-legacy",
	icon: "eZ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ez-publish:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^eZSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ez-publish:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^eZ Publish", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ez-publish:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("eZ Publish", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ez-publish:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^ezsessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ez-publish:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^ez publish", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ez-publish:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ez publish", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ez:ez_publish:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
