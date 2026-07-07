import type { TechnologyDefinition } from '../../types';

export const getsimpleCmsTechnologyDefinition = {
	id: "getsimple-cms",
	name: "GetSimple CMS",
	website: "https://get-simple.info",
	description: "GetSimple CMS is a flat-file content management system written in PHP.",
	icon: "GetSimple CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "getsimple-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("GetSimple", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "getsimple-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("getsimple", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:get-simple:getsimple_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
