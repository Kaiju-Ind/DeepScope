import type { TechnologyDefinition } from '../../types';

export const dayJsTechnologyDefinition = {
	id: "day-js",
	name: "Day.js",
	website: "https://github.com/iamkun/dayjs",
	description: "Day.js is a lightweight JavaScript library for parsing, validating, and formatting dates.",
	icon: "Day.js.svg",
	categories: [
		"dates",
		"widgets-misc",
	],
	rules: [
		{
			id: "day-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "dayjs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "day-js:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\$isDayjsObject"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\[\"\\\\$isDayjsObject\"\\]"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.\\$L.*\\.\\$d.*\\.\\$y.*\\.\\$M"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\\.\\$y.*\\.\\$M.*\\.\\$D.*\\.\\$W.*\\.\\$H"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("dayjs\\.extend\\([^)]+\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("extend\\((?:customParseFormat|updateLocale|relativeTime|isoWeek)\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"Invalid Date\"===\\w+\\.\\$d\\.toString\\(\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("\"Invalid Date\"===\\w+\\.toString\\(\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "day-js:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("\"plugin conflict\"|\"plugin function is required\"|\"plugin name is required\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
