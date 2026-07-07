import type { TechnologyDefinition } from '../../types';

export const twistphpTechnologyDefinition = {
	id: "twistphp",
	name: "TwistPHP",
	website: "https://twistphp.com",
	icon: "TwistPHP.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "twistphp:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("TwistPHP", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "twistphp:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("twistphp", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
