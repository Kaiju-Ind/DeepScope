import type { TechnologyDefinition } from '../../types';

export const xpressengineTechnologyDefinition = {
	id: "xpressengine",
	name: "XpressEngine",
	website: "https://www.xpressengine.com/",
	description: "XpressEngine (XE) is an open-source content management system (CMS) designed for building and managing websites, blogs, and online communities.",
	icon: "XpressEngine.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "xpressengine:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("XpressEngine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "xpressengine:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("xpressengine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:xpressengine:xpressengine:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
