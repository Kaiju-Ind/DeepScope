import type { TechnologyDefinition } from '../../types';

export const tanstackStartTechnologyDefinition = {
	id: "tanstack-start",
	name: "TanStack Start",
	website: "https://tanstack.com/start",
	description: "Start building your app with TanStack Start.Full-stack React and Solid framework powered by TanStack Router",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "tanstack-start:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("Expected to find a dehydrated data on window\\.__TSR_SSR__\\.dehydrated\\.\\.\\. but we did not\\. Please file an issue!"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-start:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("__beforeLoadContext\\s*=\\s*[a-zA-Z_$][\\w$]*\\.ssr!?\\.serializer\\.parse\\(\\s*[a-zA-Z_$][\\w$]*\\.__beforeLoadContext\\s*,?\\s*\\)"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-start:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("(\\w+)\\.parse\\(window\\.__TSR_SSR__\\.dehydrated\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "tanstack-start:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("clientSsr\\s*=\\s*\\{\\s*getStreamedValue\\s*:[\\s\\S]{0,2048}?window\\.__TSR_SSR__[\\s\\S]{0,2048}?streamedValues[\\s\\S]{0,512}?serializer\\.parse\\("),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
