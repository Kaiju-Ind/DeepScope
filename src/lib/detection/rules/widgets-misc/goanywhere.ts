import type { TechnologyDefinition } from '../../types';

export const goanywhereTechnologyDefinition = {
	id: "goanywhere",
	name: "GoAnywhere",
	website: "https://www.goanywhere.com/",
	description: "GoAnywhere by HelpSystems is a Managed File Transfer (MFT) system with sharing and collaboration features.",
	icon: "goanywhere.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "goanywhere:jsGlobal:0",
			kind: "jsGlobal",
			property: "appContainer",
			valuePattern: new RegExp("GoAnywhereWebClientContainer"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goanywhere:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("goanywhere", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "goanywhere:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("goanywhere", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
