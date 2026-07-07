import type { TechnologyDefinition } from '../../types';

export const maxencedevcmsTechnologyDefinition = {
	id: "maxencedevcms",
	name: "MaxenceDEVCMS",
	website: "https://cms.maxencedev.fr",
	description: "MaxenceDEVCMS is a simple CMS for ecommerce, esport, landing page.",
	icon: "default.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maxencedevcms:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^MaxenceDEV$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "maxencedevcms:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^maxencedev$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
