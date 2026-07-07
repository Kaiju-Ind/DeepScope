import type { TechnologyDefinition } from '../../types';

export const v2boardTechnologyDefinition = {
	id: "v2board",
	name: "V2Board",
	website: "https://v2board.com",
	description: "V2Board is a multi-agent protocol management system with an interface for managing multiple proxy protocols.",
	icon: "V2Board.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "v2board:dom:0",
			kind: "dom",
			selector: "link[href*='/theme/v2board/assets/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
