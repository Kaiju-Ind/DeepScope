import type { TechnologyDefinition } from '../../types';

export const rxjsTechnologyDefinition = {
	id: "rxjs",
	name: "RxJS",
	website: "https://reactivex.io",
	description: "RxJS is a reactive library used to implement reactive programming to deal with async implementation, callbacks, and event-based programs.",
	icon: "RxJS.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "rxjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rx(?:\\.\\w+)?(?:\\.compat|\\.global)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rxjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rx.CompositeDisposable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rxjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "Rx.Symbol",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
