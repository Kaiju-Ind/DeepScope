import type { TechnologyDefinition } from '../../types';

export const reactSpringTechnologyDefinition = {
	id: "react-spring",
	name: "React Spring",
	website: "https://www.react-spring.dev/",
	description: "A spring-physics based animation library for React",
	categories: [
		"animation",
	],
	rules: [
		{
			id: "react-spring:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("react-spring[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-spring:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("@react-spring\\/"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "react-spring:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"react-spring\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-spring:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"@react-spring\\/web\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-spring:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"@react-spring\\/core\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-spring:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"SpringValue\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "react-spring:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"SpringRef\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
