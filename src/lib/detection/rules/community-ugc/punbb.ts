import type { TechnologyDefinition } from '../../types';

export const punbbTechnologyDefinition = {
	id: "punbb",
	name: "punBB",
	website: "https://punbb.informer.com",
	icon: "punBB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "punbb:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+punbb"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "punbb:jsGlobal:1",
			kind: "jsGlobal",
			property: "PUNBB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "punbb:html:2",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+punbb"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gnu:punbb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
