import type { TechnologyDefinition } from '../../types';

export const clarityDesignTechnologyDefinition = {
	id: "clarity-design",
	name: "Clarity Design System",
	website: "https://clarity.design",
	description: "Clarity is an open-source design system that brings together UX guidelines, an HTML/CSS framework, and Angular components.",
	icon: "clarity.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "clarity-design:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clr-angular(?:\\.umd)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clarity-design:dom:1",
			kind: "dom",
			selector: "link[href*='clr-ui'], clr-main-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "clarity-design:jsGlobal:2",
			kind: "jsGlobal",
			property: "ClarityIcons",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"angular",
	],
} as const satisfies TechnologyDefinition;
