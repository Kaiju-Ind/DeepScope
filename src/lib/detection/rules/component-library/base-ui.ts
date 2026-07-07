import type { TechnologyDefinition } from '../../types';

export const baseUiTechnologyDefinition = {
	id: "base-ui",
	name: "Base UI",
	website: "https://base-ui.com/react/overview/quick-start",
	description: "Base UI is an unstyled React component library that provides accessible, high-performance building blocks for creating user interfaces, emphasizing accessibility, performance, and developer experience.",
	icon: "BaseUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "base-ui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("base-ui\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "base-ui:dom:1",
			kind: "dom",
			selector: "div[data-base-ui-focusable]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "base-ui:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("base-ui\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "base-ui:dom:3",
			kind: "dom",
			selector: "[id^='base-ui-'], [data-base-ui-navigation-menu-trigger]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
