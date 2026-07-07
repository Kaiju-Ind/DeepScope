import type { TechnologyDefinition } from '../../types';

export const komodoCmsTechnologyDefinition = {
	id: "komodo-cms",
	name: "Komodo CMS",
	website: "https://www.komodocms.com",
	icon: "Komodo CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "komodo-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Komodo CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "komodo-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^komodo cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
