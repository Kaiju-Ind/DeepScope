import type { TechnologyDefinition } from '../../types';

export const locomotiveScrollTechnologyDefinition = {
	id: "locomotive-scroll",
	name: "Locomotive Scroll",
	website: "https://github.com/locomotivemtl/locomotive-scroll",
	description: "Locomotive Scroll is an opinionated JavaScript library that provides smooth scrolling animations and advanced scroll interactions for web applications.",
	icon: "Locomotive Scroll.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "locomotive-scroll:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("locomotive-scroll(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "locomotive-scroll:dom:1",
			kind: "dom",
			selector: "div[data-scroll-section]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "locomotive-scroll:jsGlobal:2",
			kind: "jsGlobal",
			property: "LocomotiveScroll",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "locomotive-scroll:jsGlobal:3",
			kind: "jsGlobal",
			property: "locomotiveScrollVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
	implies: [
		"lenis",
	],
} as const satisfies TechnologyDefinition;
