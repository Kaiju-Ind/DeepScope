import type { TechnologyDefinition } from '../../types';

export const vaadinTechnologyDefinition = {
	id: "vaadin",
	name: "Vaadin",
	website: "https://vaadin.com",
	description: "Vaadin is an open-source framework for building user interfaces and single-page applications using Java and TypeScript.",
	icon: "Vaadin.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "vaadin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vaadinBootstrap\\.js(?:\\?v=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vaadin:jsGlobal:1",
			kind: "jsGlobal",
			property: "vaadin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vaadin:jsGlobal:2",
			kind: "jsGlobal",
			property: "Vaadin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vaadin:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("vaadinbootstrap\\.js(?:\\?v=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:vaadin:vaadin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
