import type { TechnologyDefinition } from '../../types';

export const turbolinksTechnologyDefinition = {
	id: "turbolinks",
	name: "Turbolinks",
	website: "https://github.com/turbolinks/turbolinks",
	description: "Turbolinks is a Rails feature, available as a gem and enabled by default in new Rails apps. It is intended to speed up navigating between pages of your application.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "turbolinks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("turolinks\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "turbolinks:jsGlobal:1",
			kind: "jsGlobal",
			property: "Turbolinks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
