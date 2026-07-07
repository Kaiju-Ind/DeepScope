import type { TechnologyDefinition } from '../../types';

export const trackjsTechnologyDefinition = {
	id: "trackjs",
	name: "TrackJs",
	website: "https://trackjs.com",
	description: "TrackJS is an error monitoring agent for production web sites and applications.",
	icon: "TrackJs.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trackjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.trackjs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trackjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "TrackJs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trackjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "trackJs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
