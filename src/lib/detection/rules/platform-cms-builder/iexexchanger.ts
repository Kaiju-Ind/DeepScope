import type { TechnologyDefinition } from '../../types';

export const iexexchangerTechnologyDefinition = {
	id: "iexexchanger",
	name: "iEXExchanger",
	website: "https://exchanger.iexbase.com",
	icon: "iEXExchanger.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "iexexchanger:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^iexexchanger_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "iexexchanger:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("iEXExchanger", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "iexexchanger:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("iexexchanger", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"angular",
		"apache-http-server",
		"php",
	],
} as const satisfies TechnologyDefinition;
