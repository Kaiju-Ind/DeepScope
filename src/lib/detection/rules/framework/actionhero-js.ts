import type { TechnologyDefinition } from '../../types';

export const actionheroJsTechnologyDefinition = {
	id: "actionhero-js",
	name: "actionhero.js",
	website: "https://www.actionherojs.com",
	icon: "actionhero.js.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "actionhero-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("actionheroClient\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "actionhero-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "actionheroClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "actionhero-js:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("actionhero API", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "actionhero-js:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("actionheroclient\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "actionhero-js:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("actionhero api", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
