import type { TechnologyDefinition } from '../../types';
import { adobeDtmTechnologyDefinition } from './adobe-dtm';
import { adobeExperiencePlatformLaunchTechnologyDefinition } from './adobe-experience-platform-launch';
import { commandersActTagcommanderTechnologyDefinition } from './commanders-act-tagcommander';
import { ensightenTechnologyDefinition } from './ensighten';
import { facebookPixelAdvancedMatchingTechnologyDefinition } from './facebook-pixel-advanced-matching';
import { googleTagManagerTechnologyDefinition } from './google-tag-manager';
import { matomoTagManagerTechnologyDefinition } from './matomo-tag-manager';
import { tagproTechnologyDefinition } from './tagpro';
import { tealiumTechnologyDefinition } from './tealium';
import { yahooTagManagerTechnologyDefinition } from './yahoo-tag-manager';
import { yottaaTechnologyDefinition } from './yottaa';

import { shopifyGtmProxyTechnologyDefinition } from './shopify-gtm-proxy';
export const tagManagementTechnologyDefinitions = [
	adobeDtmTechnologyDefinition,
	adobeExperiencePlatformLaunchTechnologyDefinition,
	commandersActTagcommanderTechnologyDefinition,
	ensightenTechnologyDefinition,
	facebookPixelAdvancedMatchingTechnologyDefinition,
	googleTagManagerTechnologyDefinition,
	matomoTagManagerTechnologyDefinition,
	tagproTechnologyDefinition,
	tealiumTechnologyDefinition,
	yahooTagManagerTechnologyDefinition,
	yottaaTechnologyDefinition,
	shopifyGtmProxyTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
