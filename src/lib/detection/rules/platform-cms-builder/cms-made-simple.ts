import type { TechnologyDefinition } from '../../types';

export const cmsMadeSimpleTechnologyDefinition = {
	id: "cms-made-simple",
	name: "CMS Made Simple",
	website: "https://cmsmadesimple.org",
	description: "CMS Made Simple is an open-source content management system for building and managing websites.",
	icon: "CMS Made Simple.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cms-made-simple:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CMSSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cms-made-simple:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("CMS Made Simple", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cms-made-simple:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^cmssessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cms-made-simple:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cms made simple", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cmsmadesimple:cms_made_simple:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
