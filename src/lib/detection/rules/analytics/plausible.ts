import type { TechnologyDefinition } from '../../types';

export const plausibleTechnologyDefinition = {
	id: "plausible",
	name: "Plausible",
	website: "https://plausible.io/",
	description: "Plausible is an open-source alternative to Google Analytics.",
	icon: "Plausible.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "plausible:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plausible\\.io\\/js\\/plausible\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plausible:jsGlobal:1",
			kind: "jsGlobal",
			property: "plausible",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plausible:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("console\\.warn\\(['\"]\\[Plausible\\] Ignoring event because website is running locally['\"]\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "plausible:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("console\\.warn\\(['\"]\\[Plausible\\] Ignoring event because \"plausible_ignore\" is set to \"true\" in localStorage['\"]\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "plausible:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("['\"]apiHost[\"']:\\s*[\"']https:\\/\\/plausible\\.io[\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "plausible:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("window\\.localStorage\\.plausible_ignore === ['\"]true['\"]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "plausible:resourceUrl:modern:4",
			kind: "resourceUrl",
			pattern: new RegExp("plausible\\.io\\/js|plausible\\.io\\/api\\/event|\\/plausible\\.js"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
