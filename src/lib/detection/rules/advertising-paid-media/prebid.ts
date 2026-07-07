import type { TechnologyDefinition } from '../../types';

export const prebidTechnologyDefinition = {
	id: "prebid",
	name: "Prebid",
	website: "https://prebid.org",
	description: "Prebid is an open-source header bidding wrapper. It forms the core of our Nucleus ad platform, helping maximize revenue and performance for publishers.",
	icon: "Prebid.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "prebid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/prebid\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prebid:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("adnxs\\.com\\/[^\"]*(?:prebid|\\/pb\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prebid:jsGlobal:2",
			kind: "jsGlobal",
			property: "PREBID_TIMEOUT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prebid:jsGlobal:3",
			kind: "jsGlobal",
			property: "pbjs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prebid:jsGlobal:4",
			kind: "jsGlobal",
			property: "pbjs.version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
