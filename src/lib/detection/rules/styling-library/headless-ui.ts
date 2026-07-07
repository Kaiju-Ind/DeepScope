import type { TechnologyDefinition } from '../../types';

export const headlessUiTechnologyDefinition = {
	id: "headless-ui",
	name: "Headless UI",
	website: "https://headlessui.dev",
	description: "Headless UI is an unstyled component library for either React.js or Vue.js from the same people that created Tailwind CSS.",
	icon: "Headless UI.svg",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "headless-ui:dom:0",
			kind: "dom",
			selector: "[data-headlessui-state], [data-headlessui-focus], [data-headlessui-focus-visible]",
			description: "DOM contains Headless UI state attributes.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
