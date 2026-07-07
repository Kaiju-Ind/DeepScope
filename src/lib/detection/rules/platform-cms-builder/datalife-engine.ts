import type { TechnologyDefinition } from '../../types';

export const datalifeEngineTechnologyDefinition = {
	id: "datalife-engine",
	name: "DataLife Engine",
	website: "https://dle-news.ru",
	description: "DataLife Engine is a PHP content management system and blog engine.",
	icon: "DataLife Engine.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "datalife-engine:jsGlobal:0",
			kind: "jsGlobal",
			property: "dle_root",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "datalife-engine:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("DataLife Engine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "datalife-engine:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("datalife engine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:dleviet:datalife_engine:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"php",
	],
} as const satisfies TechnologyDefinition;
