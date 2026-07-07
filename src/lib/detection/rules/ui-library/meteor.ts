import type { TechnologyDefinition } from '../../types';

export const meteorTechnologyDefinition = {
	id: "meteor",
	name: "Meteor",
	website: "https://www.meteor.com",
	description: "Meteor is a JavaScript-based platform used for developing web and mobile applications with a unified language across all layers of the application stack.",
	icon: "Meteor.png",
	categories: [
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "meteor:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+__meteor-css__"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "meteor:jsGlobal:1",
			kind: "jsGlobal",
			property: "Meteor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meteor:jsGlobal:2",
			kind: "jsGlobal",
			property: "Meteor.release",
			valuePattern: new RegExp("^METEOR@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "meteor:dom:3",
			kind: "dom",
			selector: "link.__meteor-css__",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:meteor:meteor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mongodb",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
