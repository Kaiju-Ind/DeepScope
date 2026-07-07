import type { TechnologyDefinition } from '../../types';

export const facebookLoginTechnologyDefinition = {
	id: "facebook-login",
	name: "Facebook Login",
	website: "https://developers.facebook.com/docs/facebook-login/",
	description: "Facebook Login is a way for people to create accounts and log into your app across multiple platforms.",
	icon: "Facebook.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "facebook-login:jsGlobal:0",
			kind: "jsGlobal",
			property: "FB.getLoginStatus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
