import type { TechnologyDefinition } from '../../types';

export const paperJsTechnologyDefinition = {
	id: "paper-js",
	name: "Paper.js",
	website: "https://paperjs.org",
	description: "Paper.js is an open-source vector graphics scripting framework that operates on the HTML5 Canvas.",
	icon: "PaperJS.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "paper-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?paper(?:-full)?(?:-core)?(?:\\.min)?(?:-[\\d\\w]{0,64})?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paper-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "paper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paper-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "paper.PaperScope",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paper-js:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("paper(?:-full)?\\.js(?:\\/|$|\\?|\\#)|\\/paper\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
