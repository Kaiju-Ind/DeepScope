import type { TechnologyDefinition } from '../../types';

export const leptonTechnologyDefinition = {
	id: "lepton",
	name: "LEPTON",
	website: "https://www.lepton-cms.org",
	description: "LEPTON is a PHP-based content management system with support for MySQL/MariaDB, WYSIWYG editing, multi-language capability, and secure backend features.",
	icon: "LEPTON.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lepton:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("LEPTON", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lepton:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("lepton", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lepton-cms:lepton:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
