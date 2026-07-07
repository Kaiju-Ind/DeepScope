import type { TechnologyDefinition } from '../../types';

export const emberJsTechnologyDefinition = {
	id: "ember-js",
	name: "Ember.js",
	website: "https://emberjs.com",
	description: "Ember.js is a comprehensive JavaScript framework that simplifies the development of modern web applications by providing a powerful CLI, a built-in router, and a fast rendering engine.",
	icon: "Ember.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "ember-js:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("@overview\\s+Ember -[\\s\\S]+@version\\s+(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "ember-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ember",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ember-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Ember.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ember-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "EmberENV",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ember-js:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("@overview\\s+ember -[\\s\\s]+@version\\s+(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:emberjs:ember.js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
