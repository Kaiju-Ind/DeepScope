import type { TechnologyDefinition } from '../../types';

export const instantcmsTechnologyDefinition = {
	id: "instantcms",
	name: "InstantCMS",
	website: "https://www.instantcms.ru",
	icon: "InstantCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "instantcms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^InstantCMS\\[logdate\\]$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "instantcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("InstantCMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "instantcms:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^instantcms\\[logdate\\]$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "instantcms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("instantcms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:instantcms:instantcms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
