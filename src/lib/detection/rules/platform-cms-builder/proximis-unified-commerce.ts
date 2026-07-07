import type { TechnologyDefinition } from '../../types';

export const proximisUnifiedCommerceTechnologyDefinition = {
	id: "proximis-unified-commerce",
	name: "Proximis Unified Commerce",
	website: "https://www.proximis.com",
	icon: "Proximis Omnichannel.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "proximis-unified-commerce:html:0",
			kind: "html",
			pattern: new RegExp("<html[^>]+data-ng-app=\"RbsChangeApp\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "proximis-unified-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "__change",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proximis-unified-commerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Proximis Unified Commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "proximis-unified-commerce:dom:3",
			kind: "dom",
			selector: "html[data-ng-app*='RbsChangeApp']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "proximis-unified-commerce:html:4",
			kind: "html",
			pattern: new RegExp("<html[^>]+data-ng-app=\"rbschangeapp\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "proximis-unified-commerce:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("proximis unified commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"angularjs",
		"php",
	],
} as const satisfies TechnologyDefinition;
