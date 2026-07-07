import type { TechnologyDefinition } from '../../types';

export const splashthatTechnologyDefinition = {
	id: "splashthat",
	name: "SplashThat",
	website: "https://splashthat.com",
	description: "SplashThat is a platform for building and hosting event marketing experiences, including tools for invitations, registration, and attendee engagement.",
	icon: "SplashThat.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "splashthat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.splashthat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "splashthat:jsGlobal:1",
			kind: "jsGlobal",
			property: "SPLASH.apiClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "splashthat:jsGlobal:2",
			kind: "jsGlobal",
			property: "SplashUI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
