import type { TechnologyDefinition } from '../../types';

export const webComponentsTechnologyDefinition = {
	id: "web-components",
	name: "Web Components",
	website: "https://webcomponents.org/",
	description: "Suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "web-components:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("customElements\\.define\\s*\\(\\s*['\"`][^'\"`]+['\"`]\\s*,\\s*(?:class\\s+\\w+\\s+extends\\s+HTMLElement|class\\s*\\{|function\\s*\\(|[A-Za-z_$][\\w$]*)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "web-components:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.attachShadow\\s*\\(\\s*\\{(?:\\s*mode\\s*:\\s*['\"`](?:open|closed)['\"`]|[^}]*)\\}"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "web-components:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("document\\.querySelector\\s*\\(\\s*['\"`]template(?:[^'\"`]*)?['\"`]\\)|\\.content\\.cloneNode\\s*\\(|\\.importNode\\s*\\(\\s*template"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "web-components:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("(?:connected|disconnected|adopted)Callback|attributeChanged(?:Callback)?\\s*\\([^)]*\\)\\s*\\{"),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "web-components:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("element\\.slot\\s*=|addEventListener\\s*\\(\\s*['\"`]slotchange['\"`]|\\.assignedNodes\\s*\\(|\\.assignedElements\\s*\\("),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "web-components:html:modern:5",
			kind: "html",
			pattern: new RegExp("<(?!next-route-announcer\\b)[a-z]+-[a-z-]*[^>]*>", "i"),
			confidence: 45,
			description: "Document contains a custom-element tag. This is weak on its own because frameworks such as Next.js emit internal custom elements.",
		},
		{
			id: "web-components:html:modern:6",
			kind: "html",
			pattern: new RegExp("<template[^>]*>[\\s\\S]*?<\\/template>"),
			confidence: 45,
			description: "Document contains a template element. This is weak on its own and needs script-level Web Components evidence.",
		},
		{
			id: "web-components:html:modern:7",
			kind: "html",
			pattern: new RegExp("<slot(?:[^>]*>[\\s\\S]*?<\\/slot>)"),
			confidence: 45,
			description: "Document contains a slot element. This is weak on its own and needs script-level Web Components evidence.",
		},
	],
} as const satisfies TechnologyDefinition;
