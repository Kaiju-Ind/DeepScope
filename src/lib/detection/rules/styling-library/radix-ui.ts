import type { TechnologyDefinition } from '../../types';

export const radixUiTechnologyDefinition = {
	id: "radix-ui",
	name: "Radix UI",
	website: "https://www.radix-ui.com",
	description: "Radix UI is a React-based user interface component library that offers accessible, responsive, and customisable components for building web applications.",
	icon: "Radix UI.svg",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "radix-ui:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-accordion-content-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-toast-swipe-end-x"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:2",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-toast-swipe-move-x"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:3",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-navigation-menu-viewport-width"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:4",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-navigation-menu-viewport-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:5",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-select-trigger-width"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:6",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-select-trigger-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:7",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-context-menu-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:8",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-context-menu-content-available-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:9",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-dropdown-menu-content-available-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:10",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-dropdown-menu-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:11",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-hover-card-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:12",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-popover-trigger-width"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:13",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-popover-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:14",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-select-content-available-height"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:15",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-select-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:stylesheetContent:16",
			kind: "stylesheetContent",
			pattern: new RegExp("--radix-tooltip-content-transform-origin"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "radix-ui:dom:17",
			kind: "dom",
			selector: "a[data-radix-collection-item], button[data-radix-collection-item]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;
