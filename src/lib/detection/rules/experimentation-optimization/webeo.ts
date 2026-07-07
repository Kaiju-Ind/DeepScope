import type { TechnologyDefinition } from '../../types';

export const webeoTechnologyDefinition = {
	id: "webeo",
	name: "Webeo",
	website: "https://www.webeo.com",
	description: "Webeo is a platform that enables website owners to customize the content on their website for each individual visitor, creating a unique experience for them.",
	icon: "Webeo.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "webeo:dom:0",
			kind: "dom",
			selector: "script#__webeoCoreScript",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__webeoEventQueue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:2",
			kind: "jsGlobal",
			property: "__webeoGlobals",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:3",
			kind: "jsGlobal",
			property: "__webeoRunPersonalisation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:4",
			kind: "jsGlobal",
			property: "__webeoScriptStart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:5",
			kind: "jsGlobal",
			property: "__webeoStarted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:6",
			kind: "jsGlobal",
			property: "__webeoUnmask",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeo:jsGlobal:7",
			kind: "jsGlobal",
			property: "__webeoVisitData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
