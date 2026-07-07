import type { TechnologyDefinition } from '../../types';

export const talentbrewTechnologyDefinition = {
	id: "talentbrew",
	name: "TalentBrew",
	website: "https://talentbrewrecruitment.co.uk",
	description: "TalentBrew is a platform that streamlines the recruitment process.",
	icon: "TalentBrew.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "talentbrew:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tbcdn\\.talentbrew\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
