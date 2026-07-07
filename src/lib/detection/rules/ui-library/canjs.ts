import type { TechnologyDefinition } from '../../types';

export const canjsTechnologyDefinition = {
	id: "canjs",
	name: "CanJS",
	website: "https://canjs.com",
	description: "CanJS is an MIT-licensed client-side JavaScript framework used for building maintainable and performant web applications.",
	icon: "CanJS.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "canjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/canjs\\/can\\.custom\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "canjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "can.Animation",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
