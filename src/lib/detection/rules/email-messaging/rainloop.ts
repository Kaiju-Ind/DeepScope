import type { TechnologyDefinition } from '../../types';

export const rainloopTechnologyDefinition = {
	id: "rainloop",
	name: "RainLoop",
	website: "https://www.rainloop.net/",
	description: "RainLoop is a web-based email client.",
	icon: "RainLoop.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rainloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^rainloop\\/v\\/([0-9.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rainloop:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]href=\"rainloop\\/v\\/([0-9.]+)\\/static\\/apple-touch-icon\\.png\\/>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "rainloop:jsGlobal:2",
			kind: "jsGlobal",
			property: "rainloop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rainloop:jsGlobal:3",
			kind: "jsGlobal",
			property: "rainloopI18N",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rainloop:header:4",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^RainLoop", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rainloop:meta:5",
			kind: "meta",
			key: "rlAppVersion",
			valuePattern: new RegExp("^([0-9.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rainloop:dom:6",
			kind: "dom",
			selector: "link[href*='rainloop/v/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rainloop:header:7",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^rainloop", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rainloop:meta:8",
			kind: "meta",
			key: "rlappversion",
			valuePattern: new RegExp("^([0-9.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
