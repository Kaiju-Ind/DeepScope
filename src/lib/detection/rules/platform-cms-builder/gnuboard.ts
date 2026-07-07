import type { TechnologyDefinition } from '../../types';

export const gnuboardTechnologyDefinition = {
	id: "gnuboard",
	name: "Gnuboard",
	website: "https://github.com/gnuboard",
	description: "Gnuboard is an open-source bulletin board system or CMS from South Korea.",
	icon: "default.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gnuboard:dom:0",
			kind: "dom",
			selector: "a[href*='board.php']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gnuboard:dom:1",
			kind: "dom",
			selector: "link[href*='/gnuboard/style.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gnuboard:jsGlobal:2",
			kind: "jsGlobal",
			property: "g4_bbs_img",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gnuboard:jsGlobal:3",
			kind: "jsGlobal",
			property: "g4_is_admin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gnuboard:jsGlobal:4",
			kind: "jsGlobal",
			property: "g5_is_admin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gnuboard:jsGlobal:5",
			kind: "jsGlobal",
			property: "g5_js_ver",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sir:gnuboard:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
