import type { TechnologyDefinition } from '../../types';

export const ohDearTechnologyDefinition = {
	id: "oh-dear",
	name: "Oh Dear",
	website: "https://ohdear.app",
	description: "The all-in-one monitoring tool for your entire website. Oh Dear monitors uptime, SSL certificates, broken links, scheduled tasks, application health, DNS, domain expiry and more.",
	icon: "Oh Dear.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "oh-dear:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ohdear\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oh-dear:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.config.userAgent",
			valuePattern: new RegExp("OhDear\\.app"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
