import type { TechnologyDefinition } from '../../types';

export const maxsiteCmsTechnologyDefinition = {
	id: "maxsite-cms",
	name: "MaxSite CMS",
	website: "https://max-3000.com",
	description: "MaxSite CMS is a PHP-based content management system from Ukraine.",
	icon: "MaxSite CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maxsite-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("MaxSite CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "maxsite-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("maxsite cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:max-3000:maxsite_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
