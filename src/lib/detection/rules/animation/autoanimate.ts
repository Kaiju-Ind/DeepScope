import type { TechnologyDefinition } from '../../types';

export const autoanimateTechnologyDefinition = {
	id: "autoanimate",
	name: "AutoAnimate",
	website: "https://auto-animate.formkit.com/",
	description: "Add motion to your apps with a single line of code",
	categories: [
		"animation",
	],
	rules: [
		{
			id: "autoanimate:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("@formkit\\/auto-animate[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "autoanimate:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("auto-animate"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "autoanimate:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"@formkit\\/auto-animate\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "autoanimate:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"autoAnimate\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
