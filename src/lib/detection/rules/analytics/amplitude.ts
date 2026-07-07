import type { TechnologyDefinition } from '../../types';

export const amplitudeTechnologyDefinition = {
	id: "amplitude",
	name: "Amplitude",
	website: "https://amplitude.com",
	description: "Amplitude is a web and mobile analytics solution with cross-platform user journey tracking, user behavior analysis and segmentation capabilities.",
	icon: "Amplitude.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "amplitude:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.(?:segment.+)?amplitude(?:\\.com|-plugins)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amplitude:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.amplitude\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "amplitude:jsGlobal:2",
			kind: "jsGlobal",
			property: "AMPLITUDE_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amplitude:jsGlobal:3",
			kind: "jsGlobal",
			property: "__AMPLITUDE__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amplitude:jsGlobal:4",
			kind: "jsGlobal",
			property: "amplitudeClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amplitude:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("this\\.amplitudeInstance"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "amplitude:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("automaticFetchOnAmplitudeIdentityChange"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "amplitude:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("[\"']amplitude_unsent_identify[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "amplitude:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("[\"']amplitude_lastEventId[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "amplitude:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("[\"']amplitude_sessionId[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "amplitude:resourceUrl:modern:5",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.amplitude\\.com|api\\.(lab)?\\.amplitude\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
