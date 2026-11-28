import type { TechnologyDefinition } from "../../types.ts";
import { amapTechnologyDefinition } from "./amap.ts";
import { appleMapkitJsTechnologyDefinition } from "./apple-mapkit-js.ts";
import { arcgisApiForJavascriptTechnologyDefinition } from "./arcgis-api-for-javascript.ts";
import { baiduMapsTechnologyDefinition } from "./baidu-maps.ts";
import { bigdatacloudIpGeolocationTechnologyDefinition } from "./bigdatacloud-ip-geolocation.ts";
import { bullseyeTechnologyDefinition } from "./bullseye.ts";
import { cartoAnalyticsTechnologyDefinition } from "./carto-analytics.ts";
import { clustrmapsWidgetTechnologyDefinition } from "./clustrmaps-widget.ts";
import { dbIpTechnologyDefinition } from "./db-ip.ts";
import { develicOmniumMapsTechnologyDefinition } from "./develic-omnium-maps.ts";
import { eagleviewTechnologyDefinition } from "./eagleview.ts";
import { geoTargetlyTechnologyDefinition } from "./geo-targetly.ts";
import { geoapifyTechnologyDefinition } from "./geoapify.ts";
import { geobytesTechnologyDefinition } from "./geobytes.ts";
import { googleMapsTechnologyDefinition } from "./google-maps.ts";
import { hereTechnologyDefinition } from "./here.ts";
import { ipApiTechnologyDefinition } from "./ip-api.ts";
import { ip2locationIoTechnologyDefinition } from "./ip2location-io.ts";
import { ipapiTechnologyDefinition } from "./ipapi.ts";
import { ipapiCoTechnologyDefinition } from "./ipapi-co.ts";
import { ipbaseTechnologyDefinition } from "./ipbase.ts";
import { ipdataTechnologyDefinition } from "./ipdata.ts";
import { ipgeolocationTechnologyDefinition } from "./ipgeolocation.ts";
import { ipifyTechnologyDefinition } from "./ipify.ts";
import { ipinfoTechnologyDefinition } from "./ipinfo.ts";
import { ipinfodbTechnologyDefinition } from "./ipinfodb.ts";
import { ipstackTechnologyDefinition } from "./ipstack.ts";
import { leafletTechnologyDefinition } from "./leaflet.ts";
import { leafletPlatformTechnologyDefinition } from "./leaflet-platform.ts";
import { mapboxGlJsTechnologyDefinition } from "./mapbox-gl-js.ts";
import { mapboxJsTechnologyDefinition } from "./mapbox-js.ts";
import { maplibreGlJsTechnologyDefinition } from "./maplibre-gl-js.ts";
import { maplineTechnologyDefinition } from "./mapline.ts";
import { maplocoTechnologyDefinition } from "./maploco.ts";
import { mapmeTechnologyDefinition } from "./mapme.ts";
import { mappedinTechnologyDefinition } from "./mappedin.ts";
import { mapplicTechnologyDefinition } from "./mapplic.ts";
import { maptalksTechnologyDefinition } from "./maptalks.ts";
import { maptilerTechnologyDefinition } from "./maptiler.ts";
import { maxmindTechnologyDefinition } from "./maxmind.ts";
import { microsoftAzureMapsTechnologyDefinition } from "./microsoft-azure-maps.ts";
import { naverMapsTechnologyDefinition } from "./naver-maps.ts";
import { neshanTechnologyDefinition } from "./neshan.ts";
import { openlayersTechnologyDefinition } from "./openlayers.ts";
import { openstreetmapTechnologyDefinition } from "./openstreetmap.ts";
import { openweathermapTechnologyDefinition } from "./openweathermap.ts";
import { proloFinderTechnologyDefinition } from "./prolo-finder.ts";
import { radarTechnologyDefinition } from "./radar.ts";
import { revolvermapsTechnologyDefinition } from "./revolvermaps.ts";
import { seaticsTechnologyDefinition } from "./seatics.ts";
import { stockistTechnologyDefinition } from "./stockist.ts";
import { storeifyStoreLocatorTechnologyDefinition } from "./storeify-store-locator.ts";
import { storepointTechnologyDefinition } from "./storepoint.ts";
import { storerocketTechnologyDefinition } from "./storerocket.ts";
import { terriajsTechnologyDefinition } from "./terriajs.ts";
import { tomtomMapsTechnologyDefinition } from "./tomtom-maps.ts";
import { woosmapTechnologyDefinition } from "./woosmap.ts";
import { zeemapsTechnologyDefinition } from "./zeemaps.ts";

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
