import type { TechnologyDefinition } from '../../types';

export const craftCmsTechnologyDefinition = {
	id: "craft-cms",
	name: "Craft CMS",
	website: "https://craftcms.com/",
	description: "Craft CMS is a content management system for building bespoke websites.",
	icon: "Craft CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "craft-cms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CraftSessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "craft-cms:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("\\bCraft CMS\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "craft-cms:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^CRAFT_CSRF_TOKEN$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "craft-cms:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^craftsessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "craft-cms:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("\\bcraft cms\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:craftcms:craft_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"yii",
	],
} as const satisfies TechnologyDefinition;
