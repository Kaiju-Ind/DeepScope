import type { TechnologyDefinition } from '../../types';

export const loadableComponentsTechnologyDefinition = {
	id: "loadable-components",
	name: "Loadable-Components",
	website: "https://github.com/gregberge/loadable-components",
	description: "Loadable-Components is a library to solve the React code-splitting client-side and server-side.",
	icon: "Loadable-Components.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "loadable-components:dom:0",
			kind: "dom",
			selector: "script#__LOADABLE_REQUIRED_CHUNKS__",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "loadable-components:jsGlobal:1",
			kind: "jsGlobal",
			property: "__LOADABLE_LOADED_CHUNKS__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
