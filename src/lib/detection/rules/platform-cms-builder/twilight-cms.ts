import type { TechnologyDefinition } from '../../types';

export const twilightCmsTechnologyDefinition = {
	id: "twilight-cms",
	name: "Twilight CMS",
	website: "https://www.twilightcms.com",
	icon: "Twilight CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "twilight-cms:header:0",
			kind: "header",
			key: "X-Powered-CMS",
			valuePattern: new RegExp("Twilight CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "twilight-cms:header:1",
			kind: "header",
			key: "x-powered-cms",
			valuePattern: new RegExp("twilight cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
