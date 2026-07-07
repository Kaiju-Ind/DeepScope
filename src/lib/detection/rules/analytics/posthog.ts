import type { TechnologyDefinition } from '../../types';

export const posthogTechnologyDefinition = {
	id: "posthog",
	name: "PostHog",
	website: "https://posthog.com",
	description: "PostHog is the open-source, all-in-one product analytics platform.",
	icon: "PostHog.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "posthog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.posthog\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "posthog:jsGlobal:1",
			kind: "jsGlobal",
			property: "posthog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "posthog:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("\\.posthog\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "posthog:jsGlobal:3",
			kind: "jsGlobal",
			property: "__PosthogExtensions__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "posthog:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("i\\.posthog\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"payg",
		],
		cpe: "cpe:2.3:a:posthog:posthog:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
