import type { TechnologyDefinition } from '@/lib/detection/types';

export const rxjsTechnologyDefinition: TechnologyDefinition = {
	id: 'rxjs',
	name: 'RxJS',
	website: 'https://reactivex.io',
	description:
		'RxJS is a JavaScript library for composing asynchronous and event-based programs with Observable values.',
	icon: 'RxJS.png',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'rxjs:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('(?<![\\w-])rx(?:\\.\\w+)?(?:\\.compat|\\.global)?(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'rxjs:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'Rx.CompositeDisposable',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'rxjs:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'Rx.Symbol',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	versioning: {
		scheme: 'semver',
	},
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
