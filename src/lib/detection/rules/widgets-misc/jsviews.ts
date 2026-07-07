import type { TechnologyDefinition } from '../../types';

export const jsviewsTechnologyDefinition = {
	id: "jsviews",
	name: "JsViews",
	website: "https://www.jsviews.com/#jsviews",
	description: "JsViews is the MVVM library which provides two-way data binding for the template. The library is developed and maintained by Microsoft employee Boris Moore and is used in projects such as Outlook.com and Windows Azure.",
	icon: "JsViews.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jsviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d\\.]+)?\\/jsviews(?:\\.min)?\\.js"),
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
		"jsobservable",
		"jsrender",
	],
} as const satisfies TechnologyDefinition;
