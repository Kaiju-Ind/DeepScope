import type { TechnologyDefinition } from '../../types';

export const timeagoTechnologyDefinition = {
	id: "timeago",
	name: "Timeago",
	website: "https://timeago.yarp.com",
	description: "Timeago is a jQuery plugin that makes it easy to support automatically updating fuzzy timestamps.",
	icon: "Timeago.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "timeago:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.timeago\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "timeago:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?(?:jquery\\.)?[Tt]imeago(?:_mkdocs_material)?(?:\\.full)?(?:\\.locales)?(?:\\.native)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "timeago:jsGlobal:2",
			kind: "jsGlobal",
			property: "timeago",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "timeago:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?(?:jquery\\.)?[tt]imeago(?:_mkdocs_material)?(?:\\.full)?(?:\\.locales)?(?:\\.native)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
