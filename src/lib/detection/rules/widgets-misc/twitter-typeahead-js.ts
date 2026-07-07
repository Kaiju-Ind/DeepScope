import type { TechnologyDefinition } from '../../types';

export const twitterTypeaheadJsTechnologyDefinition = {
	id: "twitter-typeahead-js",
	name: "Twitter typeahead.js",
	website: "https://twitter.github.io/typeahead.js",
	icon: "Twitter typeahead.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "twitter-typeahead-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:typeahead|bloodhound)\\.(?:jquery|bundle)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twitter-typeahead-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "typeahead",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
