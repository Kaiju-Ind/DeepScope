import type { TechnologyDefinition } from '../../types';
import { amapTechnologyDefinition } from './amap';
import { appleMapkitJsTechnologyDefinition } from './apple-mapkit-js';
import { arcgisApiForJavascriptTechnologyDefinition } from './arcgis-api-for-javascript';
import { baiduMapsTechnologyDefinition } from './baidu-maps';
import { bigdatacloudIpGeolocationTechnologyDefinition } from './bigdatacloud-ip-geolocation';
import { bullseyeTechnologyDefinition } from './bullseye';
import { cartoAnalyticsTechnologyDefinition } from './carto-analytics';
import { clustrmapsWidgetTechnologyDefinition } from './clustrmaps-widget';
import { dbIpTechnologyDefinition } from './db-ip';
import { develicOmniumMapsTechnologyDefinition } from './develic-omnium-maps';
import { eagleviewTechnologyDefinition } from './eagleview';
import { geoTargetlyTechnologyDefinition } from './geo-targetly';
import { geoapifyTechnologyDefinition } from './geoapify';
import { geobytesTechnologyDefinition } from './geobytes';
import { googleMapsTechnologyDefinition } from './google-maps';
import { hereTechnologyDefinition } from './here';
import { ipApiTechnologyDefinition } from './ip-api';
import { ip2locationIoTechnologyDefinition } from './ip2location-io';
import { ipapiTechnologyDefinition } from './ipapi';
import { ipapiCoTechnologyDefinition } from './ipapi-co';
import { ipbaseTechnologyDefinition } from './ipbase';
import { ipdataTechnologyDefinition } from './ipdata';
import { ipgeolocationTechnologyDefinition } from './ipgeolocation';
import { ipifyTechnologyDefinition } from './ipify';
import { ipinfoTechnologyDefinition } from './ipinfo';
import { ipinfodbTechnologyDefinition } from './ipinfodb';
import { ipstackTechnologyDefinition } from './ipstack';
import { leafletTechnologyDefinition } from './leaflet';
import { leafletPlatformTechnologyDefinition } from './leaflet-platform';
import { mapboxGlJsTechnologyDefinition } from './mapbox-gl-js';
import { mapboxJsTechnologyDefinition } from './mapbox-js';
import { maplibreGlJsTechnologyDefinition } from './maplibre-gl-js';
import { maplineTechnologyDefinition } from './mapline';
import { maplocoTechnologyDefinition } from './maploco';
import { mapmeTechnologyDefinition } from './mapme';
import { mappedinTechnologyDefinition } from './mappedin';
import { mapplicTechnologyDefinition } from './mapplic';
import { maptalksTechnologyDefinition } from './maptalks';
import { maptilerTechnologyDefinition } from './maptiler';
import { maxmindTechnologyDefinition } from './maxmind';
import { microsoftAzureMapsTechnologyDefinition } from './microsoft-azure-maps';
import { naverMapsTechnologyDefinition } from './naver-maps';
import { neshanTechnologyDefinition } from './neshan';
import { openlayersTechnologyDefinition } from './openlayers';
import { openstreetmapTechnologyDefinition } from './openstreetmap';
import { openweathermapTechnologyDefinition } from './openweathermap';
import { proloFinderTechnologyDefinition } from './prolo-finder';
import { radarTechnologyDefinition } from './radar';
import { revolvermapsTechnologyDefinition } from './revolvermaps';
import { seaticsTechnologyDefinition } from './seatics';
import { stockistTechnologyDefinition } from './stockist';
import { storeifyStoreLocatorTechnologyDefinition } from './storeify-store-locator';
import { storepointTechnologyDefinition } from './storepoint';
import { storerocketTechnologyDefinition } from './storerocket';
import { terriajsTechnologyDefinition } from './terriajs';
import { tomtomMapsTechnologyDefinition } from './tomtom-maps';
import { woosmapTechnologyDefinition } from './woosmap';
import { zeemapsTechnologyDefinition } from './zeemaps';

export const mapsLocationTechnologyDefinitions = [
	amapTechnologyDefinition,
	appleMapkitJsTechnologyDefinition,
	arcgisApiForJavascriptTechnologyDefinition,
	baiduMapsTechnologyDefinition,
	bigdatacloudIpGeolocationTechnologyDefinition,
	bullseyeTechnologyDefinition,
	cartoAnalyticsTechnologyDefinition,
	clustrmapsWidgetTechnologyDefinition,
	dbIpTechnologyDefinition,
	develicOmniumMapsTechnologyDefinition,
	eagleviewTechnologyDefinition,
	geoTargetlyTechnologyDefinition,
	geoapifyTechnologyDefinition,
	geobytesTechnologyDefinition,
	googleMapsTechnologyDefinition,
	hereTechnologyDefinition,
	ipApiTechnologyDefinition,
	ip2locationIoTechnologyDefinition,
	ipapiTechnologyDefinition,
	ipapiCoTechnologyDefinition,
	ipbaseTechnologyDefinition,
	ipdataTechnologyDefinition,
	ipgeolocationTechnologyDefinition,
	ipifyTechnologyDefinition,
	ipinfoTechnologyDefinition,
	ipinfodbTechnologyDefinition,
	ipstackTechnologyDefinition,
	leafletTechnologyDefinition,
	leafletPlatformTechnologyDefinition,
	mapboxGlJsTechnologyDefinition,
	mapboxJsTechnologyDefinition,
	maplibreGlJsTechnologyDefinition,
	maplineTechnologyDefinition,
	maplocoTechnologyDefinition,
	mapmeTechnologyDefinition,
	mappedinTechnologyDefinition,
	mapplicTechnologyDefinition,
	maptalksTechnologyDefinition,
	maptilerTechnologyDefinition,
	maxmindTechnologyDefinition,
	microsoftAzureMapsTechnologyDefinition,
	naverMapsTechnologyDefinition,
	neshanTechnologyDefinition,
	openlayersTechnologyDefinition,
	openstreetmapTechnologyDefinition,
	openweathermapTechnologyDefinition,
	proloFinderTechnologyDefinition,
	radarTechnologyDefinition,
	revolvermapsTechnologyDefinition,
	seaticsTechnologyDefinition,
	stockistTechnologyDefinition,
	storeifyStoreLocatorTechnologyDefinition,
	storepointTechnologyDefinition,
	storerocketTechnologyDefinition,
	terriajsTechnologyDefinition,
	tomtomMapsTechnologyDefinition,
	woosmapTechnologyDefinition,
	zeemapsTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
