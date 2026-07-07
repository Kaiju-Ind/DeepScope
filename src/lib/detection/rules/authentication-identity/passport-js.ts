import type { TechnologyDefinition } from '../../types';

export const passportJsTechnologyDefinition = {
	id: "passport-js",
	name: "Passport.js",
	website: "https://www.passportjs.org",
	description: "Passport.js is an authentication middleware for Node.js, supporting various strategies to enable user authentication in web applications.",
	icon: "Passport.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "passport-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Passport.Core",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passport-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Passport.Core.VERSION",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passport-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "PassportHandler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "passport-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "_passport_html",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
