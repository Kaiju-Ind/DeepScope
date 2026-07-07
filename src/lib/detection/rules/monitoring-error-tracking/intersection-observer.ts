import type { TechnologyDefinition } from '../../types';

export const intersectionObserverTechnologyDefinition = {
	id: "intersection-observer",
	name: "Intersection Observer",
	website: "https://www.w3.org/TR/intersection-observer",
	description: "Intersection Observer is a browser API that provides a way to observe the visibility and position of a DOM element relative to the containing root element or viewport.",
	icon: "W3C.png",
	categories: [
		"monitoring-error-tracking",
		"widgets-misc",
	],
	rules: [
		{
			id: "intersection-observer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/npm\\/intersection-observer@([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intersection-observer:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/(?:.+)?intersection-observer\\.[\\d\\w\\.]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
