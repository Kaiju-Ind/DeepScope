import type { TechnologyDefinition } from '../../types';

export const pencilblueTechnologyDefinition = {
	id: "pencilblue",
	name: "PencilBlue",
	website: "https://github.com/pencilblue/pencilblue",
	icon: "PencilBlue.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "pencilblue:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("PencilBlue", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pencilblue:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("pencilblue", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
