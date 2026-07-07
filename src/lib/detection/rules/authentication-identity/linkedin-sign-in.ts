import type { TechnologyDefinition } from '../../types';

export const linkedinSignInTechnologyDefinition = {
	id: "linkedin-sign-in",
	name: "Linkedin Sign-in",
	website: "https://www.linkedin.com/developers",
	description: "Linkedin Sign-In is an authentication system that reduces the burden of login for users, by enabling them to sign in with their Linkedin account.",
	icon: "Linkedin.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "linkedin-sign-in:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.linkedin\\.com\\/(?:.*)?in\\.js(?:\\?version)?([\\d.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linkedin-sign-in:jsGlobal:1",
			kind: "jsGlobal",
			property: "OnLinkedInAuth",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkedin-sign-in:jsGlobal:2",
			kind: "jsGlobal",
			property: "onLinkedInLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkedin-sign-in:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.linkedin\\.com\\/(?:.*)?(?:in\\.js(?:\\?version)?([\\d.]+)?|litms\\/utag\\/[^?]+\\.js(?:\\?cb=[\\d]+)?)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
