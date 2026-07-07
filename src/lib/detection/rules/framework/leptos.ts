import type { TechnologyDefinition } from '../../types';

export const leptosTechnologyDefinition = {
	id: "leptos",
	name: "Leptos",
	website: "https://leptos.dev",
	description: "Leptos is a full-stack, isomorphic Rust web framework leveraging fine-grained reactivity to build declarative user interfaces.",
	icon: "Leptos.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "leptos:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("export function microtask\\(f\\)"),
			confidence: 75,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "leptos:html:1",
			kind: "html",
			pattern: new RegExp("<!--hk=_.*"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "leptos:dom:2",
			kind: "dom",
			selector: "link[id^='leptos']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "leptos:jsGlobal:3",
			kind: "jsGlobal",
			property: "__LEPTOS_PENDING_RESOURCES",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leptos:jsGlobal:4",
			kind: "jsGlobal",
			property: "__LEPTOS_RESOLVED_RESOURCES",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leptos:jsGlobal:5",
			kind: "jsGlobal",
			property: "__LEPTOS_RESOURCE_RESOLVERS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"rust",
	],
} as const satisfies TechnologyDefinition;
