import type { TechnologyDefinition } from '../../types';

export const emberRouterTechnologyDefinition = {
	id: "ember-router",
	name: "Ember Router",
	website: "https://api.emberjs.com/ember/release/classes/emberrouter/",
	description: "Ember Router provides a declarative, component-based way to navigate between views in your Ember application.",
	categories: [
		"router",
	],
	rules: [
		{
			id: "ember-router:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("@ember\\/routing\\/[a-zA-Z-]+"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "ember-router:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\\._routerMicrolib\\.activeTransition"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "ember-router:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\._routerMicrolib\\.recognize"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "ember-router:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("['\"]TransitionAborted['\"].*activeTransition"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
