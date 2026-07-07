import type { TechnologyDefinition } from '../../types';

export const jsrenderTechnologyDefinition = {
	id: "jsrender",
	name: "JsRender",
	website: "https://www.jsviews.com/#jsrender",
	description: "JsRender is the template library. The library is developed and maintained by Microsoft employee Boris Moore and is used in projects such as Outlook.com and Windows Azure.",
	icon: "JsRender.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jsrender:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d\\.]+)?\\/jsrender(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jsviews",
	],
} as const satisfies TechnologyDefinition;
