import type { TechnologyDefinition } from '../../types';

export const countlyTechnologyDefinition = {
	id: "countly",
	name: "Countly",
	website: "https://count.ly",
	description: "Countly is an open-source analytics platform that provides real-time insights into mobile, web, and desktop applications, offering features such as user segmentation, performance monitoring, and crash analytics to help businesses optimize their digital experiences and user engagement strategies.",
	icon: "Countly.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "countly:jsGlobal:0",
			kind: "jsGlobal",
			property: "Countly",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "countly:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("[\"']initialize, Countly initialized[\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "countly:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("[\"']halt, Resetting Countly[\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "countly:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("[\"']enable_offline_mode, Countly is already in offline mode[\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "countly:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("countly-sdk-web"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
