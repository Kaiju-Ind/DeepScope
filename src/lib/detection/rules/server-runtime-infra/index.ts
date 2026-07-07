import type { TechnologyDefinition } from '../../types';
import { technology8baseTechnologyDefinition } from './8base';
import { adminerTechnologyDefinition } from './adminer';
import { almalinuxTechnologyDefinition } from './almalinux';
import { amazonAlbTechnologyDefinition } from './amazon-alb';
import { amazonAuroraTechnologyDefinition } from './amazon-aurora';
import { amazonEc2TechnologyDefinition } from './amazon-ec2';
import { amazonElbTechnologyDefinition } from './amazon-elb';
import { angieTechnologyDefinition } from './angie';
import { aolserverTechnologyDefinition } from './aolserver';
import { apacheApisixTechnologyDefinition } from './apache-apisix';
import { apacheHttpServerTechnologyDefinition } from './apache-http-server';
import { apacheTomcatTechnologyDefinition } from './apache-tomcat';
import { apacheTrafficServerTechnologyDefinition } from './apache-traffic-server';
import { applicationRequestRoutingTechnologyDefinition } from './application-request-routing';
import { artifactoryWebServerTechnologyDefinition } from './artifactory-web-server';
import { azureFrontDoorTechnologyDefinition } from './azure-front-door';
import { cactivecloudTechnologyDefinition } from './cactivecloud';
import { caddyTechnologyDefinition } from './caddy';
import { centminmodTechnologyDefinition } from './centminmod';
import { centosTechnologyDefinition } from './centos';
import { cherokeeTechnologyDefinition } from './cherokee';
import { cherrypyTechnologyDefinition } from './cherrypy';
import { clarisFilemakerTechnologyDefinition } from './claris-filemaker';
import { clouderaTechnologyDefinition } from './cloudera';
import { couchdbTechnologyDefinition } from './couchdb';
import { cowboyTechnologyDefinition } from './cowboy';
import { daphneTechnologyDefinition } from './daphne';
import { darwinTechnologyDefinition } from './darwin';
import { debianTechnologyDefinition } from './debian';
import { denoTechnologyDefinition } from './deno';
import { dimensionsAiTechnologyDefinition } from './dimensions-ai';
import { dockerTechnologyDefinition } from './docker';
import { elogHttpTechnologyDefinition } from './elog-http';
import { embedthisAppwebTechnologyDefinition } from './embedthis-appweb';
import { engintronTechnologyDefinition } from './engintron';
import { envoyTechnologyDefinition } from './envoy';
import { ezproxyTechnologyDefinition } from './ezproxy';
import { f5BigipTechnologyDefinition } from './f5-bigip';
import { fastpixelTechnologyDefinition } from './fastpixel';
import { fedoraTechnologyDefinition } from './fedora';
import { ferronTechnologyDefinition } from './ferron';
import { firebaseTechnologyDefinition } from './firebase';
import { freebsdTechnologyDefinition } from './freebsd';
import { gentooTechnologyDefinition } from './gentoo';
import { glassfishTechnologyDefinition } from './glassfish';
import { goaheadTechnologyDefinition } from './goahead';
import { googleAppEngineTechnologyDefinition } from './google-app-engine';
import { googleCloudLoadBalancingTechnologyDefinition } from './google-cloud-load-balancing';
import { googlePagespeedTechnologyDefinition } from './google-pagespeed';
import { googleWebServerTechnologyDefinition } from './google-web-server';
import { gunicornTechnologyDefinition } from './gunicorn';
import { h2oTechnologyDefinition } from './h2o';
import { harborTechnologyDefinition } from './harbor';
import { hclDominoTechnologyDefinition } from './hcl-domino';
import { hhvmTechnologyDefinition } from './hhvm';
import { hiawathaTechnologyDefinition } from './hiawatha';
import { hirschmannHiosTechnologyDefinition } from './hirschmann-hios';
import { hpCompactServerTechnologyDefinition } from './hp-compact-server';
import { hpIloTechnologyDefinition } from './hp-ilo';
import { hydraShieldTechnologyDefinition } from './hydra-shield';
import { hypercornTechnologyDefinition } from './hypercorn';
import { ibmDatapowerTechnologyDefinition } from './ibm-datapower';
import { ibmHttpServerTechnologyDefinition } from './ibm-http-server';
import { iisTechnologyDefinition } from './iis';
import { indyTechnologyDefinition } from './indy';
import { intelActiveManagementTechnologyTechnologyDefinition } from './intel-active-management-technology';
import { jbossApplicationServerTechnologyDefinition } from './jboss-application-server';
import { jbossWebTechnologyDefinition } from './jboss-web';
import { jettyTechnologyDefinition } from './jetty';
import { kangleTechnologyDefinition } from './kangle';
import { kestrelTechnologyDefinition } from './kestrel';
import { knackTechnologyDefinition } from './knack';
import { kongTechnologyDefinition } from './kong';
import { libwwwPerlDaemonTechnologyDefinition } from './libwww-perl-daemon';
import { lighttpdTechnologyDefinition } from './lighttpd';
import { litespeedTechnologyDefinition } from './litespeed';
import { litespeedCacheTechnologyDefinition } from './litespeed-cache';
import { llamalinkCloudServerTechnologyDefinition } from './llamalink-cloud-server';
import { luceneTechnologyDefinition } from './lucene';
import { mariadbTechnologyDefinition } from './mariadb';
import { matoriNetTechnologyDefinition } from './matori-net';
import { microsoftHttpapiTechnologyDefinition } from './microsoft-httpapi';
import { miniHttpdTechnologyDefinition } from './mini-httpd';
import { miniservTechnologyDefinition } from './miniserv';
import { mochiwebTechnologyDefinition } from './mochiweb';
import { modAuthPamTechnologyDefinition } from './mod-auth-pam';
import { modDavTechnologyDefinition } from './mod-dav';
import { modFastcgiTechnologyDefinition } from './mod-fastcgi';
import { modJkTechnologyDefinition } from './mod-jk';
import { modPerlTechnologyDefinition } from './mod-perl';
import { modPythonTechnologyDefinition } from './mod-python';
import { modRackTechnologyDefinition } from './mod-rack';
import { modRailsTechnologyDefinition } from './mod-rails';
import { modSslTechnologyDefinition } from './mod-ssl';
import { modWsgiTechnologyDefinition } from './mod-wsgi';
import { mongodbTechnologyDefinition } from './mongodb';
import { mongrelTechnologyDefinition } from './mongrel';
import { monkeyHttpServerTechnologyDefinition } from './monkey-http-server';
import { mysqlTechnologyDefinition } from './mysql';
import { nghttpxHttp2ProxyTechnologyDefinition } from './nghttpx-http-2-proxy';
import { nginxTechnologyDefinition } from './nginx';
import { nitropackTechnologyDefinition } from './nitropack';
import { openbsdHttpdTechnologyDefinition } from './openbsd-httpd';
import { opengseTechnologyDefinition } from './opengse';
import { openrestyTechnologyDefinition } from './openresty';
import { opensslTechnologyDefinition } from './openssl';
import { oracleApplicationServerTechnologyDefinition } from './oracle-application-server';
import { oracleHttpServerTechnologyDefinition } from './oracle-http-server';
import { oracleLinuxTechnologyDefinition } from './oracle-linux';
import { oracleWebCacheTechnologyDefinition } from './oracle-web-cache';
import { oracleWeblogicServerTechnologyDefinition } from './oracle-weblogic-server';
import { perconaTechnologyDefinition } from './percona';
import { phpmyadminTechnologyDefinition } from './phpmyadmin';
import { phppgadminTechnologyDefinition } from './phppgadmin';
import { phusionPassengerTechnologyDefinition } from './phusion-passenger';
import { postgresqlTechnologyDefinition } from './postgresql';
import { pouchdbTechnologyDefinition } from './pouchdb';
import { proxmoxVeTechnologyDefinition } from './proxmox-ve';
import { pubnubTechnologyDefinition } from './pubnub';
import { qiyekuTechnologyDefinition } from './qiyeku';
import { rabbitloaderTechnologyDefinition } from './rabbitloader';
import { rackcacheTechnologyDefinition } from './rackcache';
import { raspbianTechnologyDefinition } from './raspbian';
import { redHatTechnologyDefinition } from './red-hat';
import { redisTechnologyDefinition } from './redis';
import { redisObjectCacheTechnologyDefinition } from './redis-object-cache';
import { resinTechnologyDefinition } from './resin';
import { roadrunnerTechnologyDefinition } from './roadrunner';
import { rxWebServerTechnologyDefinition } from './rx-web-server';
import { scientificLinuxTechnologyDefinition } from './scientific-linux';
import { shelfTechnologyDefinition } from './shelf';
import { simplehttpTechnologyDefinition } from './simplehttp';
import { sitecoreExperienceEdgeTechnologyDefinition } from './sitecore-experience-edge';
import { solrTechnologyDefinition } from './solr';
import { sqlBuddyTechnologyDefinition } from './sql-buddy';
import { sqliteTechnologyDefinition } from './sqlite';
import { starletTechnologyDefinition } from './starlet';
import { sunosTechnologyDefinition } from './sunos';
import { superPageCacheTechnologyDefinition } from './super-page-cache';
import { suseTechnologyDefinition } from './suse';
import { tengineTechnologyDefinition } from './tengine';
import { thttpdTechnologyDefinition } from './thttpd';
import { tornadoserverTechnologyDefinition } from './tornadoserver';
import { twistedwebTechnologyDefinition } from './twistedweb';
import { ubuntuTechnologyDefinition } from './ubuntu';
import { unifiOsTechnologyDefinition } from './unifi-os';
import { unixTechnologyDefinition } from './unix';
import { urlloTechnologyDefinition } from './urllo';
import { uvicornTechnologyDefinition } from './uvicorn';
import { v2boardTechnologyDefinition } from './v2board';
import { varnishTechnologyDefinition } from './varnish';
import { virtuosoTechnologyDefinition } from './virtuoso';
import { w3TotalCacheTechnologyDefinition } from './w3-total-cache';
import { warpTechnologyDefinition } from './warp';
import { weblogicServerTechnologyDefinition } from './weblogic-server';
import { webrickTechnologyDefinition } from './webrick';
import { websphereTechnologyDefinition } from './websphere';
import { windowsCeTechnologyDefinition } from './windows-ce';
import { windowsServerTechnologyDefinition } from './windows-server';
import { winstoneServletContainerTechnologyDefinition } from './winstone-servlet-container';
import { wordpressSuperCacheTechnologyDefinition } from './wordpress-super-cache';
import { wpRocketTechnologyDefinition } from './wp-rocket';
import { wpcacheTechnologyDefinition } from './wpcache';
import { wpcacheonTechnologyDefinition } from './wpcacheon';
import { xamppTechnologyDefinition } from './xampp';
import { xanoTechnologyDefinition } from './xano';
import { xitamiTechnologyDefinition } from './xitami';
import { yawsTechnologyDefinition } from './yaws';
import { yunohostTechnologyDefinition } from './yunohost';
import { zendTechnologyDefinition } from './zend';
import { zopeTechnologyDefinition } from './zope';

export const serverRuntimeInfraTechnologyDefinitions = [
	technology8baseTechnologyDefinition,
	adminerTechnologyDefinition,
	almalinuxTechnologyDefinition,
	amazonAlbTechnologyDefinition,
	amazonAuroraTechnologyDefinition,
	amazonEc2TechnologyDefinition,
	amazonElbTechnologyDefinition,
	angieTechnologyDefinition,
	aolserverTechnologyDefinition,
	apacheApisixTechnologyDefinition,
	apacheHttpServerTechnologyDefinition,
	apacheTomcatTechnologyDefinition,
	apacheTrafficServerTechnologyDefinition,
	applicationRequestRoutingTechnologyDefinition,
	artifactoryWebServerTechnologyDefinition,
	azureFrontDoorTechnologyDefinition,
	cactivecloudTechnologyDefinition,
	caddyTechnologyDefinition,
	centminmodTechnologyDefinition,
	centosTechnologyDefinition,
	cherokeeTechnologyDefinition,
	cherrypyTechnologyDefinition,
	clarisFilemakerTechnologyDefinition,
	clouderaTechnologyDefinition,
	couchdbTechnologyDefinition,
	cowboyTechnologyDefinition,
	daphneTechnologyDefinition,
	darwinTechnologyDefinition,
	debianTechnologyDefinition,
	denoTechnologyDefinition,
	dimensionsAiTechnologyDefinition,
	dockerTechnologyDefinition,
	elogHttpTechnologyDefinition,
	embedthisAppwebTechnologyDefinition,
	engintronTechnologyDefinition,
	envoyTechnologyDefinition,
	ezproxyTechnologyDefinition,
	f5BigipTechnologyDefinition,
	fastpixelTechnologyDefinition,
	fedoraTechnologyDefinition,
	ferronTechnologyDefinition,
	firebaseTechnologyDefinition,
	freebsdTechnologyDefinition,
	gentooTechnologyDefinition,
	glassfishTechnologyDefinition,
	goaheadTechnologyDefinition,
	googleAppEngineTechnologyDefinition,
	googleCloudLoadBalancingTechnologyDefinition,
	googlePagespeedTechnologyDefinition,
	googleWebServerTechnologyDefinition,
	gunicornTechnologyDefinition,
	h2oTechnologyDefinition,
	harborTechnologyDefinition,
	hclDominoTechnologyDefinition,
	hhvmTechnologyDefinition,
	hiawathaTechnologyDefinition,
	hirschmannHiosTechnologyDefinition,
	hpCompactServerTechnologyDefinition,
	hpIloTechnologyDefinition,
	hydraShieldTechnologyDefinition,
	hypercornTechnologyDefinition,
	ibmDatapowerTechnologyDefinition,
	ibmHttpServerTechnologyDefinition,
	iisTechnologyDefinition,
	indyTechnologyDefinition,
	intelActiveManagementTechnologyTechnologyDefinition,
	jbossApplicationServerTechnologyDefinition,
	jbossWebTechnologyDefinition,
	jettyTechnologyDefinition,
	kangleTechnologyDefinition,
	kestrelTechnologyDefinition,
	knackTechnologyDefinition,
	kongTechnologyDefinition,
	libwwwPerlDaemonTechnologyDefinition,
	lighttpdTechnologyDefinition,
	litespeedTechnologyDefinition,
	litespeedCacheTechnologyDefinition,
	llamalinkCloudServerTechnologyDefinition,
	luceneTechnologyDefinition,
	mariadbTechnologyDefinition,
	matoriNetTechnologyDefinition,
	microsoftHttpapiTechnologyDefinition,
	miniHttpdTechnologyDefinition,
	miniservTechnologyDefinition,
	mochiwebTechnologyDefinition,
	modAuthPamTechnologyDefinition,
	modDavTechnologyDefinition,
	modFastcgiTechnologyDefinition,
	modJkTechnologyDefinition,
	modPerlTechnologyDefinition,
	modPythonTechnologyDefinition,
	modRackTechnologyDefinition,
	modRailsTechnologyDefinition,
	modSslTechnologyDefinition,
	modWsgiTechnologyDefinition,
	mongodbTechnologyDefinition,
	mongrelTechnologyDefinition,
	monkeyHttpServerTechnologyDefinition,
	mysqlTechnologyDefinition,
	nghttpxHttp2ProxyTechnologyDefinition,
	nginxTechnologyDefinition,
	nitropackTechnologyDefinition,
	openbsdHttpdTechnologyDefinition,
	opengseTechnologyDefinition,
	openrestyTechnologyDefinition,
	opensslTechnologyDefinition,
	oracleApplicationServerTechnologyDefinition,
	oracleHttpServerTechnologyDefinition,
	oracleLinuxTechnologyDefinition,
	oracleWebCacheTechnologyDefinition,
	oracleWeblogicServerTechnologyDefinition,
	perconaTechnologyDefinition,
	phpmyadminTechnologyDefinition,
	phppgadminTechnologyDefinition,
	phusionPassengerTechnologyDefinition,
	postgresqlTechnologyDefinition,
	pouchdbTechnologyDefinition,
	proxmoxVeTechnologyDefinition,
	pubnubTechnologyDefinition,
	qiyekuTechnologyDefinition,
	rabbitloaderTechnologyDefinition,
	rackcacheTechnologyDefinition,
	raspbianTechnologyDefinition,
	redHatTechnologyDefinition,
	redisTechnologyDefinition,
	redisObjectCacheTechnologyDefinition,
	resinTechnologyDefinition,
	roadrunnerTechnologyDefinition,
	rxWebServerTechnologyDefinition,
	scientificLinuxTechnologyDefinition,
	shelfTechnologyDefinition,
	simplehttpTechnologyDefinition,
	sitecoreExperienceEdgeTechnologyDefinition,
	solrTechnologyDefinition,
	sqlBuddyTechnologyDefinition,
	sqliteTechnologyDefinition,
	starletTechnologyDefinition,
	sunosTechnologyDefinition,
	superPageCacheTechnologyDefinition,
	suseTechnologyDefinition,
	tengineTechnologyDefinition,
	thttpdTechnologyDefinition,
	tornadoserverTechnologyDefinition,
	twistedwebTechnologyDefinition,
	ubuntuTechnologyDefinition,
	unifiOsTechnologyDefinition,
	unixTechnologyDefinition,
	urlloTechnologyDefinition,
	uvicornTechnologyDefinition,
	v2boardTechnologyDefinition,
	varnishTechnologyDefinition,
	virtuosoTechnologyDefinition,
	w3TotalCacheTechnologyDefinition,
	warpTechnologyDefinition,
	weblogicServerTechnologyDefinition,
	webrickTechnologyDefinition,
	websphereTechnologyDefinition,
	windowsCeTechnologyDefinition,
	windowsServerTechnologyDefinition,
	winstoneServletContainerTechnologyDefinition,
	wordpressSuperCacheTechnologyDefinition,
	wpRocketTechnologyDefinition,
	wpcacheTechnologyDefinition,
	wpcacheonTechnologyDefinition,
	xamppTechnologyDefinition,
	xanoTechnologyDefinition,
	xitamiTechnologyDefinition,
	yawsTechnologyDefinition,
	yunohostTechnologyDefinition,
	zendTechnologyDefinition,
	zopeTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
