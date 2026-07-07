import type { TechnologyDefinition } from '../../types';

export const lucideTechnologyDefinition = {
	id: "lucide",
	name: "Lucide",
	website: "https://lucide.dev",
	description: "Lucide is an open-source icon library that provides 1000+ vector (svg) files for displaying icons and symbols in digital and non-digital projects.",
	icon: "Lucide.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "lucide:dom:0",
			kind: "dom",
			selector: "svg.lucide",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lucide:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:from\\s+[\"']lucide|import\\s*\\{[^}]{1,200}\\}\\s*from\\s*[\"']lucide)(?:-react|-vue|-svelte|-angular)?\\b"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lucide:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\<(?:LucideIcon|createLucideIcon)\\b"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lucide:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("lucide-icon-[a-zA-Z0-9-]{1,40}\\b"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lucide:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"lucide-\"\\.concat\\("),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lucide:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("absoluteStrokeWidth:\\s*([a-zA-Z_$][a-zA-Z0-9_$]*)"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lucide:stylesheetContent:modern:5",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.lucide(?:-icon)?(?:\\[[^\\]]+\\]|\\.[a-zA-Z0-9-]+)?\\s*\\{[^}]*\\}"),
			confidence: 45,
			description: "Stylesheet content matches a modern styling marker.",
		},
		{
			id: "lucide:stylesheetContent:modern:6",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.lucide-(?:spin|pulse|rotate-\\d+)"),
			confidence: 45,
			description: "Stylesheet content matches a modern styling marker.",
		},
		{
			id: "lucide:stylesheetContent:modern:7",
			kind: "stylesheetContent",
			pattern: new RegExp("(?:\\.lucide|\\[data-lucide\\])\\s*>\\s*\\*"),
			confidence: 45,
			description: "Stylesheet content matches a modern styling marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
