import type { TechnologyDefinition } from '../../types';

export const skimlinksTechnologyDefinition = {
	id: "skimlinks",
	name: "Skimlinks",
	website: "https://skimlinks.com",
	description: "Skimlinks is a content monetization platform for online publishers.",
	icon: "Skimlinks.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "skimlinks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.skimresources\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "skimlinks:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.skimresources\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "skimlinks:jsGlobal:2",
			kind: "jsGlobal",
			property: "__SKIM_JS_GLOBAL__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skimlinks:jsGlobal:3",
			kind: "jsGlobal",
			property: "addSkimlinks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skimlinks:jsGlobal:4",
			kind: "jsGlobal",
			property: "skimlinksAPI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
