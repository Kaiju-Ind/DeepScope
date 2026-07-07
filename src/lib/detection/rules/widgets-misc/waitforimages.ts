import type { TechnologyDefinition } from '../../types';

export const waitforimagesTechnologyDefinition = {
	id: "waitforimages",
	name: "waitForImages",
	website: "https://github.com/alexanderdickson/waitForImages",
	description: "waitForImages is a lightweight, high-performance JavaScript library that simplifies the handling of image preloading events.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "waitforimages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:jquery\\.)?)?waitforimages(?:-modded)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "waitforimages:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:(?:jquery\\.)?)?waitforimages(?:-((?:\\d+\\.)+\\d+)-modded)?(?:\\.min)?\\.js"),
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
} as const satisfies TechnologyDefinition;
