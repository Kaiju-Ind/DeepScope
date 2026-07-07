import type { TechnologyDefinition } from '../../types';

export const recoilTechnologyDefinition = {
	id: "recoil",
	name: "Recoil",
	website: "https://recoiljs.org/",
	description: "A state management library for React that provides several capabilities that are difficult to achieve with React alone, while being compatible with the newest features of React.",
	categories: [
		"state-management",
	],
	rules: [
		{
			id: "recoil:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\$\\$isRecoilValue"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\[\"ROOT_QUERY\"\\]|\\[\"ROOT_MUTATION\"\\]"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("Recoil selector has circular dependencies:"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"RECOIL_GKS_ENABLED\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"Cannot use server actions in pages\\/api\\/\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("function\\s+atomFamily\\s*\\(\\s*\\{\\s*key\\s*:[^,]+,\\s*default\\s*:"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("function\\s+RecoilRoot\\s*\\(\\s*\\{\\s*(?:initializeState|override)\\s*:"),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:7",
			kind: "scriptContent",
			pattern: new RegExp("\"Duplicate atom key \\\\\"[^\"]+\\\\\". This is a FATAL ERROR\""),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:8",
			kind: "scriptContent",
			pattern: new RegExp("\"Missing definition for RecoilValue: \\\\\"[^\"]+\\\\\"\""),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "recoil:scriptContent:modern:9",
			kind: "scriptContent",
			pattern: new RegExp("\"Multiple Content-Length\".*\"both multipart and urlencoded\""),
			confidence: 45,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
