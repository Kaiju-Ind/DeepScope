import type { TechnologyDefinition } from '../../types';

export const webVitalsTechnologyDefinition = {
	id: "web-vitals",
	name: "web-vitals",
	website: "https://github.com/GoogleChrome/web-vitals",
	description: "The web-vitals JavaScript is a tiny, modular library for measuring all the web vitals metrics on real users.",
	icon: "web-vitals.svg",
	categories: [
		"widgets-misc",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "web-vitals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web-vitals@([\\d.]+)\\/dist\\/web-vitals.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "web-vitals:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("(8999999999999[\\s\\S]+1e12[\\s\\S]+(largest-contentful-paint|first-input|layout-shift)|(largest-contentful-paint|first-input|layout-shift)[\\s\\S]+8999999999999[\\s\\S]+1e12)"),
			confidence: 45,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "web-vitals:jsGlobal:2",
			kind: "jsGlobal",
			property: "webVitals",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "web-vitals:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("(8999999999999[\\s\\s]+1e12[\\s\\s]+(largest-contentful-paint|first-input|layout-shift)|(largest-contentful-paint|first-input|layout-shift)[\\s\\s]+8999999999999[\\s\\s]+1e12)"),
			confidence: 45,
			description: "Script content contains a bounded technology signature.",
		},

		{
			id: "web-vitals:resourceUrl:4",
			kind: "resourceUrl",
			pattern: new RegExp("(?:^|/)web-vitals(?:-[A-Za-z0-9_-]+|(?:\\.min)?)\\.js(?:[?#]|$)", "i"),
			confidence: 95,
			description: "Loaded resource URL references a Web Vitals bundle.",
		},
		{
			id: "web-vitals:link:5",
			kind: "link",
			rel: "modulepreload",
			hrefPattern: new RegExp("(?:^|/)web-vitals(?:-[A-Za-z0-9_-]+|(?:\\.min)?)\\.js(?:[?#]|$)", "i"),
			confidence: 90,
			description: "Document modulepreloads a Web Vitals bundle.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
