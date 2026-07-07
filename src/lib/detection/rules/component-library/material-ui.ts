import type { TechnologyDefinition } from '../../types';

export const materialUiTechnologyDefinition = {
	id: "material-ui",
	name: "Material UI",
	website: "https://mui.com",
	description: "Material UI is a simple and customisable component library to build faster, beautiful, and more accessible React applications.",
	icon: "MUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "material-ui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("https:\\/\\/mui\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "material-ui:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.MuiPaper-root"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "material-ui:stylesheetContent:2",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.Mui-disabled"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "material-ui:dom:3",
			kind: "dom",
			selector: "style[data-meta='MuiPaper'], div.MuiBox-root, div.MuiPaper-root, style[data-meta='MuiButton'], input.MuiInputBase-input, div.MuiContainer-root, .MuiButton-root",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
