import type { TechnologyDefinition } from '../../types';
import { applicationNameMetaTechnologyDefinition } from './application-name-meta';
import { appLinksMetaTechnologyDefinition } from './app-links-meta';
import { appleSmartAppBannerTechnologyDefinition } from './apple-smart-app-banner';
import { appleWebAppMetaTechnologyDefinition } from './apple-web-app-meta';
import { formatDetectionMetaTechnologyDefinition } from './format-detection-meta';
import { foxappyTechnologyDefinition } from './foxappy';
import { framework7TechnologyDefinition } from './framework7';
import { jqtouchTechnologyDefinition } from './jqtouch';
import { nativeLazyLoadingTechnologyDefinition } from './native-lazy-loading';
import { onsenUiTechnologyDefinition } from './onsen-ui';
import { pictureElementTechnologyDefinition } from './picture-element';
import { responsiveImagesSrcsetTechnologyDefinition } from './responsive-images-srcset';
import { startiAppTechnologyDefinition } from './starti-app';
import { themeColorTechnologyDefinition } from './theme-color';
import { twitterAppCardTechnologyDefinition } from './twitter-app-card';
import { viewportMetaTechnologyDefinition } from './viewport-meta';
import { webAppManifestTechnologyDefinition } from './web-app-manifest';
import { winkTechnologyDefinition } from './wink';

export const mobileTechnologyDefinitions = [
	applicationNameMetaTechnologyDefinition,
	appLinksMetaTechnologyDefinition,
	appleSmartAppBannerTechnologyDefinition,
	appleWebAppMetaTechnologyDefinition,
	formatDetectionMetaTechnologyDefinition,
	foxappyTechnologyDefinition,
	framework7TechnologyDefinition,
	jqtouchTechnologyDefinition,
	nativeLazyLoadingTechnologyDefinition,
	onsenUiTechnologyDefinition,
	pictureElementTechnologyDefinition,
	responsiveImagesSrcsetTechnologyDefinition,
	startiAppTechnologyDefinition,
	themeColorTechnologyDefinition,
	twitterAppCardTechnologyDefinition,
	viewportMetaTechnologyDefinition,
	webAppManifestTechnologyDefinition,
	winkTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
