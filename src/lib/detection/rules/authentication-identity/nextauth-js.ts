import type { TechnologyDefinition } from '../../types';

export const nextauthJsTechnologyDefinition = {
	id: "nextauth-js",
	name: "NextAuth.js",
	website: "https://next-auth.js.org",
	description: "NextAuth.js is a complete open-source authentication solution for Next.js applications.",
	icon: "Next-Auth.png",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "nextauth-js:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^__Host\\-next\\-auth\\.csrf\\-token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextauth-js:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^__Secure\\-next\\-auth\\.callback\\-url$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextauth-js:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^__host\\-next\\-auth\\.csrf\\-token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nextauth-js:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^__secure\\-next\\-auth\\.callback\\-url$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
