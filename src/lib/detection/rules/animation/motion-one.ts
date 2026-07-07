import type { TechnologyDefinition } from '../../types';

export const motionOneTechnologyDefinition = {
	id: "motion-one",
	name: "Motion One",
	website: "https://motion.dev/",
	description: "A new animation library built on the Web Animations API",
	categories: [
		"animation",
	],
	rules: [
		{
			id: "motion-one:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("@motionone\\/"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "motion-one:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("motion-one"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "motion-one:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"@motionone\\/dom\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "motion-one:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"@motionone\\/animation\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "motion-one:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"@motionone\\/utils\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
