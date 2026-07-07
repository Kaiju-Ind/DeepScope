import type { TechnologyDefinition } from '../../types';

export const lottieTechnologyDefinition = {
	id: "lottie",
	name: "Lottie",
	website: "https://airbnb.io/lottie/",
	description: "A library for rendering After Effects animations natively",
	categories: [
		"animation",
	],
	rules: [
		{
			id: "lottie:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("lottie-web[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "lottie:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("lottie-player[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "lottie:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("@lottiefiles\\/"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "lottie:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"bodymovin\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "lottie:html:modern:4",
			kind: "html",
			pattern: new RegExp("<lottie-player"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "lottie:html:modern:5",
			kind: "html",
			pattern: new RegExp("<dotlottie-player"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
