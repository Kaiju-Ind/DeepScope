import type { TechnologyDefinition } from '../../types';

export const yamadaUiTechnologyDefinition = {
	id: "yamada-ui",
	name: "Yamada UI",
	website: "https://yamada-ui.com",
	description: "Yamada UI is a versatile React component library.",
	icon: "YamadaUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "yamada-ui:dom:0",
			kind: "dom",
			selector: "a[aria-label*='Yamada UI']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
