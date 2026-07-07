import type { TechnologyDefinition } from '../../types';

export const blitzJsTechnologyDefinition = {
	id: "blitz-js",
	name: "Blitz.js",
	website: "https://blitzjs.com",
	description: "Blitz.js is a web development framework that uses Next.js and React and includes features for authentication, authorization, and database integration to simplify the creation of high-performance and scalable web applications.",
	icon: "blitzjs.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "blitz-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "__BLITZ_MIDDLEWARE_HOOKS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blitz-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "__BLITZ_SUSPENSE_ENABLED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blitz-js:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Blitz\\.js?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "blitz-js:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^blitz\\.js?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
