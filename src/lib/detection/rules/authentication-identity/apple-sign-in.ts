import type { TechnologyDefinition } from '../../types';

export const appleSignInTechnologyDefinition = {
	id: "apple-sign-in",
	name: "Apple Sign-in",
	website: "https://developer.apple.com/sign-in-with-apple/",
	description: "Apple Sign-in is based on OAuth 2.0 and OpenID Connect, and provides a privacy-friendly way for users to sign in to websites and apps.",
	icon: "Apple.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "apple-sign-in:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("appleid\\.auth\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "apple-sign-in:dom:1",
			kind: "dom",
			selector: "a[href*='appleid.apple.com/auth/authorize']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apple-sign-in:dom:2",
			kind: "dom",
			selector: "#appleid-signin, [data-appleid-signin], meta[name='appleid-signin-client-id']",
			description: "DOM contains Sign in with Apple markers.",
		},
		{
			id: "apple-sign-in:html:5",
			kind: "html",
			pattern: new RegExp("(?:appleid\\.cdn-apple\\.com/appleauth|appleid\\.apple\\.com/auth/authorize|appleid-signin-client-id)", "i"),
			confidence: 95,
			description: "Document HTML contains Sign in with Apple SDK or OAuth markers.",
		},
		{
			id: "apple-sign-in:text:3",
			kind: "text",
			pattern: new RegExp("(Sign (in|up)|Log in|Continue) with Apple"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "apple-sign-in:jsGlobal:4",
			kind: "jsGlobal",
			property: "AppleID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
