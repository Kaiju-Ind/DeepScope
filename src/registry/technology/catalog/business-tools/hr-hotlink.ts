import type { TechnologyDefinition } from '@/lib/detection/types';

export const hrHotlinkTechnologyDefinition: TechnologyDefinition = {
	id: 'hr-hotlink',
	name: 'HR Hotlink',
	website: 'https://corporate.hrhotlink.com',
	description:
		'HR Hotlink is a software tool that supports human resources processes for automotive organizations, including recruitment, employee records, and workforce management.',
	icon: 'HRHotlink.svg',
	categories: [
		'business-tools',
	],
	rules: [
		{
			id: 'hr-hotlink:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('\\.hrhotlink\\.com'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
