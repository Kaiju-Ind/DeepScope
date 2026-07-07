import type { TechnologyDefinition } from '../../types';

export const sekolahkuTechnologyDefinition = {
	id: "sekolahku",
	name: "Sekolahku",
	website: "https://sekolahku.web.id",
	description: "Sekolahku is a content management system and online student admissions (PPDB) platform designed for primary and secondary schools.",
	icon: "Sekolahku.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sekolahku:meta:0",
			kind: "meta",
			key: "identifier-URL",
			valuePattern: new RegExp("www\\.sekolahku\\.web\\.id", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
