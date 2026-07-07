import type { TechnologyDefinition } from '../../types';

export const jsobservableTechnologyDefinition = {
	id: "jsobservable",
	name: "JsObservable",
	website: "https://www.jsviews.com/#jsobservable",
	description: "JsObservable is integrated with JsViews and facilitates observable data manipulations that are immediately reflected in the data-bound templates. The library is developed and maintained by Microsoft employee Boris Moore and is used in projects such as Outlook.com and Windows Azure.",
	icon: "JsObservable.svg",
	categories: [
		"widgets-misc",
	],
	rules: [],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
