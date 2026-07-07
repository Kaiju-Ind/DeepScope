import type { TechnologyDefinition } from '../../types';

export const magicUiTechnologyDefinition = {
	id: "magic-ui",
	name: "Magic UI",
	website: "https://magicui.design/",
	description: "Magic UI is an UI library featuring open-source animated components built with React, TypeScript, Tailwind CSS, and Framer Motion.",
	icon: "MagicUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "magic-ui:dom:0",
			kind: "dom",
			selector: "iframe[src*='.magicui.design']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "magic-ui:dom:1",
			kind: "dom",
			selector: "a[href*='magicui.design'] > video[src*='cdn.magicui.design']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "magic-ui:dom:2",
			kind: "dom",
			selector: "iframe[src*='.magicui.design'],a[href*='magicui.design'] > video[src*='cdn.magicui.design']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
