import type { TechnologyDefinition } from '../../types';

export const lightmonEngineTechnologyDefinition = {
	id: "lightmon-engine",
	name: "LightMon Engine",
	website: "https://lightmon.ru",
	icon: "LightMon Engine.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lightmon-engine:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Lightmon Engine Copyright Lightmon"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lightmon-engine:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^lm_online$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "lightmon-engine:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("LightMon Engine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lightmon-engine:html:3",
			kind: "html",
			pattern: new RegExp("<!-- lightmon engine copyright lightmon"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lightmon-engine:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("lightmon engine", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
