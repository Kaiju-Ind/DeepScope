import type { TechnologyDefinition } from '../../types';

export const teachableTechnologyDefinition = {
	id: "teachable",
	name: "Teachable",
	website: "https://teachable.com",
	description: "Teachable is a learning management system or LMS platform.",
	icon: "Teachable.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "teachable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.teachablecdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "teachable:jsGlobal:1",
			kind: "jsGlobal",
			property: "isTeachable",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teachable:jsGlobal:2",
			kind: "jsGlobal",
			property: "teachableIcons",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teachable:jsGlobal:3",
			kind: "jsGlobal",
			property: "trackTeachableGAEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teachable:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_gat_teachableTracker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "teachable:meta:5",
			kind: "meta",
			key: "asset_host",
			valuePattern: new RegExp("\\.teachablecdn\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "teachable:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^_gat_teachabletracker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
