import type { TechnologyDefinition } from '../../types';

export const cakephpTechnologyDefinition = {
	id: "cakephp",
	name: "CakePHP",
	website: "https://cakephp.org",
	description: "CakePHP is an open-source web framework. It follows the model–view–controller (MVC) approach and is written in PHP.",
	icon: "CakePHP.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "cakephp:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^cakephp$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cakephp:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("CakePHP", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cakephp:jsGlobal:2",
			kind: "jsGlobal",
			property: "__cakeDebugBlockInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cakephp:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("cakephp", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:cakephp:cakephp:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
