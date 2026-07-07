import type { TechnologyDefinition } from '../../types';

export const holduixCmsTechnologyDefinition = {
	id: "holduix-cms",
	name: "Holduix CMS",
	website: "https://www.holduix.dev",
	description: "Holduix CMS is a lightweight content management solution designed to offer developers and end users a customizable experience.",
	icon: "HolduixCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "holduix-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "HolduixConfig.baseURL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "holduix-cms:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Holduix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "holduix-cms:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^holduix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
