import type { TechnologyDefinition } from '../../types';

export const helloElementorTechnologyDefinition = {
	id: "hello-elementor",
	name: "Hello Elementor",
	website: "https://elementor.com/hello-theme/",
	description: "Hello Elementor is a WordPress theme built for the Elementor website builder platform. It uses minimal styling and scripts for maximum speed and design freedom.",
	icon: "Hello Elementor.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hello-elementor:dom:0",
			kind: "dom",
			selector: "link[id*='elementor-hello']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hello-elementor:dom:1",
			kind: "dom",
			selector: "link[id*='hello-elementor']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hello-elementor:dom:2",
			kind: "dom",
			selector: "script[id*='hello-elementor']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
		],
	},
	implies: [
		"elementor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
