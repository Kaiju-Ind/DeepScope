import type { TechnologyDefinition } from '../../types';

export const trackjsTechnologyDefinition = {
	id: "trackjs",
	name: "TrackJS",
	website: "https://trackjs.com/",
	description: "TrackJS makes finding and fixing JavaScript errors simple. The library automatically detects and captures errors from your web application with a clear story of how it happened.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "trackjs:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.__trackjs_state__"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("['\"']trackjs-correlation-id['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("this\\._trackJs\\.logId"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("this\\._trackJs\\.method"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("Error\\(['\"']TrackJS Caught: "),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.__trackjs_element_text"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("console\\.warn\\(['\"']\\[TrackJS] invalid config['\"']\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "trackjs:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("trackjs\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
