import type { TechnologyDefinition } from '../../types';

export const amiroCmsTechnologyDefinition = {
	id: "amiro-cms",
	name: "Amiro.CMS",
	website: "https://www.amiro.ru",
	description: "Amiro.CMS is a commercial content management system developed and distributed by the Russian company Amiro. Written in PHP and uses MySQL as a database.",
	icon: "Amiro.CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "amiro-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Amiro", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "amiro-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("amiro", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
