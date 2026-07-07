import type { TechnologyDefinition } from '../../types';

export const gsapTechnologyDefinition = {
	id: "gsap",
	name: "GSAP",
	website: "https://greensock.com/gsap",
	description: "GSAP is an animation library that allows you to create animations with JavaScript.",
	icon: "TweenMax.png",
	categories: [
		"animation",
		"ui-library",
	],
	rules: [
		{
			id: "gsap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("TweenMax(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gsap:jsGlobal:1",
			kind: "jsGlobal",
			property: "TweenLite.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gsap:jsGlobal:2",
			kind: "jsGlobal",
			property: "TweenMax.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gsap:jsGlobal:3",
			kind: "jsGlobal",
			property: "gsap.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gsap:jsGlobal:4",
			kind: "jsGlobal",
			property: "gsapVersions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gsap:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("tweenmax(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gsap:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("gsap[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "gsap:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("greensock"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "gsap:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("GreenSock"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "gsap:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("GreenSockGlobals"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "gsap:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("registerPlugin"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "gsap:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"scrollTrigger\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "gsap:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"autoAlpha\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
