import type { TechnologyDefinition } from '@/lib/detection/types';

export const oxiSocialLoginTechnologyDefinition: TechnologyDefinition = {
	id: 'oxi-social-login',
	name: 'Oxi Social Login',
	website: 'https://www.oxiapps.com/',
	description: 'Oxi Social Login provides one click login with services like Facebook, Google and many more.',
	icon: 'OxiSocialLogin.png',
	categories: [
		'authentication-identity',
	],
	rules: [
		{
			id: 'oxi-social-login:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('social-login\\.oxiapps\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
