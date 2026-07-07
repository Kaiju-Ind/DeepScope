import type { TechnologyDefinition } from '../../types';

export const framerMotionTechnologyDefinition = {
	id: "framer-motion",
	name: "Framer Motion",
	website: "https://motion.dev",
	description: "Framer Motion is a modern animation library for JavaScript, React, and Vue.",
	icon: "FramerMotion.svg",
	categories: [
		"animation",
		"widgets-misc",
	],
	rules: [
		{
			id: "framer-motion:jsGlobal:0",
			kind: "jsGlobal",
			property: "MotionIsMounted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framer-motion:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("framer-motion[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"framer-motion\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"data-framer-portal-id\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"framerAppearId\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"motionComponentSymbol\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"projectionUpdate\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "framer-motion:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"projectionFrame\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
