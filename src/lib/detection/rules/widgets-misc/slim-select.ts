import type { TechnologyDefinition } from '../../types';

export const slimSelectTechnologyDefinition = {
	id: "slim-select",
	name: "Slim Select",
	website: "https://slimselectjs.com",
	description: "Slim Select is a JavaScript library designed to enable the creation of select dropdowns with enhanced functionality and features.",
	icon: "SlimSelect.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "slim-select:dom:0",
			kind: "dom",
			selector: "div.ss-values, div.ss-deselect.ss-hide",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
