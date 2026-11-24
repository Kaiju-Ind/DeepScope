import type { TechnologyDefinition } from '@/lib/detection/types';

export const platformShTechnologyDefinition: TechnologyDefinition = {
	id: 'platform-sh',
	name: 'Platform.sh',
	website: 'https://platform.sh',
	icon: 'platformsh.svg',
	categories: [
		'infrastructure-hosting',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
