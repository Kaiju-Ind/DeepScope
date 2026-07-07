import type { TechnologyDefinition } from '../../types';

export const droxitTechnologyDefinition = {
	id: "droxit",
	name: "Droxit",
	website: "https://www.droxit.com",
	description: "Droxit is an automated web accessibility solution.",
	icon: "Droxit.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "droxit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/droxit-a11y\\/js\\/activator\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "droxit:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^droxit_a11y_state$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
