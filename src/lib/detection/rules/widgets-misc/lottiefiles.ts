import type { TechnologyDefinition } from '../../types';

export const lottiefilesTechnologyDefinition = {
	id: "lottiefiles",
	name: "LottieFiles",
	website: "https://lottiefiles.com",
	description: "LottieFiles is an open-source animation file format that's tiny, high quality, interactive, and can be manipulated at runtime.",
	icon: "LottieFiles.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lottiefiles:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/dist\\/lottie-player\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lottiefiles:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/dist\\/tgs-player\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lottiefiles:dom:2",
			kind: "dom",
			selector: "lottie-player, div[data-animation-type='lottie'], div[data-testid='lottie-player'], clipPath[id*='__lottie_element_']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lottiefiles:jsGlobal:3",
			kind: "jsGlobal",
			property: "dotlottie-player",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lottiefiles:jsGlobal:4",
			kind: "jsGlobal",
			property: "lottie.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
