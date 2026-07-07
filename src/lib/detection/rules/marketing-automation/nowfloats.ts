import type { TechnologyDefinition } from '../../types';

export const nowfloatsTechnologyDefinition = {
	id: "nowfloats",
	name: "Nowfloats",
	website: "https://www.nowfloats.com",
	description: "Nowfloats is a location-based platform that automates SEO for business websites.",
	icon: "Nowfloats.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nowfloats:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("NOWFLOATS_POSITION"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "nowfloats:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("nowfloats_position"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
