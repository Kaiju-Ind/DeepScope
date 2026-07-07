import type { TechnologyDefinition } from '../../types';

export const lithiumTechnologyDefinition = {
	id: "lithium",
	name: "Lithium",
	website: "https://www.lithium.com",
	icon: "Lithium.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lithium:html:0",
			kind: "html",
			pattern: new RegExp(" <a [^>]+Powered by Lithium"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lithium:jsGlobal:1",
			kind: "jsGlobal",
			property: "LITHIUM",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lithium:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^LithiumVisitor$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "lithium:html:3",
			kind: "html",
			pattern: new RegExp(" <a [^>]+powered by lithium"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lithium:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^lithiumvisitor$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
