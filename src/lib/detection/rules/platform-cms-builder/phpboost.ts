import type { TechnologyDefinition } from '../../types';

export const phpboostTechnologyDefinition = {
	id: "phpboost",
	name: "PHPBoost",
	website: "https://www.phpboost.com",
	description: "PHPBoost is an open-source CMS that runs on Linux, Windows Server and macOS using PHP and web servers like Apache, Nginx, or IIS.",
	icon: "PHPBoost.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phpboost:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^PHPBoost$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "phpboost:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phpboost$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
