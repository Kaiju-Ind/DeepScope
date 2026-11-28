import type { TechnologyDefinition } from "../../types.ts";
import { technology8baseTechnologyDefinition } from "./8base.ts";
import { adminerTechnologyDefinition } from "./adminer.ts";
import { almalinuxTechnologyDefinition } from "./almalinux.ts";
import { amazonAlbTechnologyDefinition } from "./amazon-alb.ts";
import { amazonAuroraTechnologyDefinition } from "./amazon-aurora.ts";
import { amazonEc2TechnologyDefinition } from "./amazon-ec2.ts";
import { amazonElbTechnologyDefinition } from "./amazon-elb.ts";
import { angieTechnologyDefinition } from "./angie.ts";
import { aolserverTechnologyDefinition } from "./aolserver.ts";
import { apacheApisixTechnologyDefinition } from "./apache-apisix.ts";
import { apacheHttpServerTechnologyDefinition } from "./apache-http-server.ts";
import { apacheTomcatTechnologyDefinition } from "./apache-tomcat.ts";
import { apacheTrafficServerTechnologyDefinition } from "./apache-traffic-server.ts";
import { applicationRequestRoutingTechnologyDefinition } from "./application-request-routing.ts";
import { artifactoryWebServerTechnologyDefinition } from "./artifactory-web-server.ts";
import { aspNetMvcTechnologyDefinition } from "./asp-net-mvc.ts";
import { azureFrontDoorTechnologyDefinition } from "./azure-front-door.ts";
import { cactivecloudTechnologyDefinition } from "./cactivecloud.ts";
import { caddyTechnologyDefinition } from "./caddy.ts";
import { centminmodTechnologyDefinition } from "./centminmod.ts";
import { centosTechnologyDefinition } from "./centos.ts";
import { cherokeeTechnologyDefinition } from "./cherokee.ts";
import { cherrypyTechnologyDefinition } from "./cherrypy.ts";
import { clarisFilemakerTechnologyDefinition } from "./claris-filemaker.ts";
import { clouderaTechnologyDefinition } from "./cloudera.ts";
import { couchdbTechnologyDefinition } from "./couchdb.ts";
import { cowboyTechnologyDefinition } from "./cowboy.ts";
import { daphneTechnologyDefinition } from "./daphne.ts";
import { darwinTechnologyDefinition } from "./darwin.ts";
import { debianTechnologyDefinition } from "./debian.ts";
import { denoTechnologyDefinition } from "./deno.ts";
import { dimensionsAiTechnologyDefinition } from "./dimensions-ai.ts";
import { dockerTechnologyDefinition } from "./docker.ts";
import { elogHttpTechnologyDefinition } from "./elog-http.ts";
import { embedthisAppwebTechnologyDefinition } from "./embedthis-appweb.ts";
import { engintronTechnologyDefinition } from "./engintron.ts";
import { envoyTechnologyDefinition } from "./envoy.ts";
import { ezproxyTechnologyDefinition } from "./ezproxy.ts";
import { f5BigipTechnologyDefinition } from "./f5-bigip.ts";
import { fastpixelTechnologyDefinition } from "./fastpixel.ts";
import { fedoraTechnologyDefinition } from "./fedora.ts";
import { ferronTechnologyDefinition } from "./ferron.ts";
import { firebaseTechnologyDefinition } from "./firebase.ts";
import { freebsdTechnologyDefinition } from "./freebsd.ts";
import { gentooTechnologyDefinition } from "./gentoo.ts";
import { glassfishTechnologyDefinition } from "./glassfish.ts";
import { goaheadTechnologyDefinition } from "./goahead.ts";
import { googleAppEngineTechnologyDefinition } from "./google-app-engine.ts";
import { googleCloudLoadBalancingTechnologyDefinition } from "./google-cloud-load-balancing.ts";
import { googlePagespeedTechnologyDefinition } from "./google-pagespeed.ts";
import { googleWebServerTechnologyDefinition } from "./google-web-server.ts";
import { gunicornTechnologyDefinition } from "./gunicorn.ts";
import { h2oTechnologyDefinition } from "./h2o.ts";
import { harborTechnologyDefinition } from "./harbor.ts";
import { hclDominoTechnologyDefinition } from "./hcl-domino.ts";
import { hhvmTechnologyDefinition } from "./hhvm.ts";
import { hiawathaTechnologyDefinition } from "./hiawatha.ts";
import { hirschmannHiosTechnologyDefinition } from "./hirschmann-hios.ts";
import { hpCompactServerTechnologyDefinition } from "./hp-compact-server.ts";
import { hpIloTechnologyDefinition } from "./hp-ilo.ts";
import { hydraShieldTechnologyDefinition } from "./hydra-shield.ts";
import { hypercornTechnologyDefinition } from "./hypercorn.ts";
import { ibmDatapowerTechnologyDefinition } from "./ibm-datapower.ts";
import { ibmHttpServerTechnologyDefinition } from "./ibm-http-server.ts";
import { iisTechnologyDefinition } from "./iis.ts";
import { indyTechnologyDefinition } from "./indy.ts";
import { intelActiveManagementTechnologyTechnologyDefinition } from "./intel-active-management-technology.ts";
import { jbossApplicationServerTechnologyDefinition } from "./jboss-application-server.ts";
import { jbossWebTechnologyDefinition } from "./jboss-web.ts";
import { jettyTechnologyDefinition } from "./jetty.ts";
import { kangleTechnologyDefinition } from "./kangle.ts";
import { kestrelTechnologyDefinition } from "./kestrel.ts";
import { knackTechnologyDefinition } from "./knack.ts";
import { kongTechnologyDefinition } from "./kong.ts";
import { libwwwPerlDaemonTechnologyDefinition } from "./libwww-perl-daemon.ts";
import { lighttpdTechnologyDefinition } from "./lighttpd.ts";
import { litespeedTechnologyDefinition } from "./litespeed.ts";
import { litespeedCacheTechnologyDefinition } from "./litespeed-cache.ts";
import { llamalinkCloudServerTechnologyDefinition } from "./llamalink-cloud-server.ts";
import { luceneTechnologyDefinition } from "./lucene.ts";
import { mariadbTechnologyDefinition } from "./mariadb.ts";
import { matoriNetTechnologyDefinition } from "./matori-net.ts";
import { microsoftHttpapiTechnologyDefinition } from "./microsoft-httpapi.ts";
import { miniHttpdTechnologyDefinition } from "./mini-httpd.ts";
import { miniservTechnologyDefinition } from "./miniserv.ts";
import { mochiwebTechnologyDefinition } from "./mochiweb.ts";
import { modAuthPamTechnologyDefinition } from "./mod-auth-pam.ts";
import { modDavTechnologyDefinition } from "./mod-dav.ts";
import { modFastcgiTechnologyDefinition } from "./mod-fastcgi.ts";
import { modJkTechnologyDefinition } from "./mod-jk.ts";
import { modPerlTechnologyDefinition } from "./mod-perl.ts";
import { modPythonTechnologyDefinition } from "./mod-python.ts";
import { modRackTechnologyDefinition } from "./mod-rack.ts";
import { modRailsTechnologyDefinition } from "./mod-rails.ts";
import { modSslTechnologyDefinition } from "./mod-ssl.ts";
import { modWsgiTechnologyDefinition } from "./mod-wsgi.ts";
import { mongodbTechnologyDefinition } from "./mongodb.ts";
import { mongrelTechnologyDefinition } from "./mongrel.ts";
import { monkeyHttpServerTechnologyDefinition } from "./monkey-http-server.ts";
import { mysqlTechnologyDefinition } from "./mysql.ts";
import { nghttpxHttp2ProxyTechnologyDefinition } from "./nghttpx-http-2-proxy.ts";
import { nginxTechnologyDefinition } from "./nginx.ts";
import { nitropackTechnologyDefinition } from "./nitropack.ts";
import { openbsdHttpdTechnologyDefinition } from "./openbsd-httpd.ts";
import { opengseTechnologyDefinition } from "./opengse.ts";
import { openrestyTechnologyDefinition } from "./openresty.ts";
import { opensslTechnologyDefinition } from "./openssl.ts";
import { oracleApplicationServerTechnologyDefinition } from "./oracle-application-server.ts";
import { oracleHttpServerTechnologyDefinition } from "./oracle-http-server.ts";
import { oracleLinuxTechnologyDefinition } from "./oracle-linux.ts";
import { oracleWebCacheTechnologyDefinition } from "./oracle-web-cache.ts";
import { oracleWeblogicServerTechnologyDefinition } from "./oracle-weblogic-server.ts";
import { perconaTechnologyDefinition } from "./percona.ts";
import { phpmyadminTechnologyDefinition } from "./phpmyadmin.ts";
import { phppgadminTechnologyDefinition } from "./phppgadmin.ts";
import { phusionPassengerTechnologyDefinition } from "./phusion-passenger.ts";
import { postgresqlTechnologyDefinition } from "./postgresql.ts";
import { pouchdbTechnologyDefinition } from "./pouchdb.ts";
import { proxmoxVeTechnologyDefinition } from "./proxmox-ve.ts";
import { pubnubTechnologyDefinition } from "./pubnub.ts";
import { qiyekuTechnologyDefinition } from "./qiyeku.ts";
import { rabbitloaderTechnologyDefinition } from "./rabbitloader.ts";
import { rackcacheTechnologyDefinition } from "./rackcache.ts";
import { raspbianTechnologyDefinition } from "./raspbian.ts";
import { redHatTechnologyDefinition } from "./red-hat.ts";
import { redisTechnologyDefinition } from "./redis.ts";
import { redisObjectCacheTechnologyDefinition } from "./redis-object-cache.ts";
import { resinTechnologyDefinition } from "./resin.ts";
import { roadrunnerTechnologyDefinition } from "./roadrunner.ts";
import { rxWebServerTechnologyDefinition } from "./rx-web-server.ts";
import { scientificLinuxTechnologyDefinition } from "./scientific-linux.ts";
import { shelfTechnologyDefinition } from "./shelf.ts";
import { simplehttpTechnologyDefinition } from "./simplehttp.ts";
import { sitecoreExperienceEdgeTechnologyDefinition } from "./sitecore-experience-edge.ts";
import { solrTechnologyDefinition } from "./solr.ts";
import { sqlBuddyTechnologyDefinition } from "./sql-buddy.ts";
import { sqliteTechnologyDefinition } from "./sqlite.ts";
import { starletTechnologyDefinition } from "./starlet.ts";
import { sunosTechnologyDefinition } from "./sunos.ts";
import { superPageCacheTechnologyDefinition } from "./super-page-cache.ts";
import { suseTechnologyDefinition } from "./suse.ts";
import { tengineTechnologyDefinition } from "./tengine.ts";
import { thttpdTechnologyDefinition } from "./thttpd.ts";
import { tornadoserverTechnologyDefinition } from "./tornadoserver.ts";
import { twistedwebTechnologyDefinition } from "./twistedweb.ts";
import { ubuntuTechnologyDefinition } from "./ubuntu.ts";
import { unifiOsTechnologyDefinition } from "./unifi-os.ts";
import { unixTechnologyDefinition } from "./unix.ts";
import { urlloTechnologyDefinition } from "./urllo.ts";
import { uvicornTechnologyDefinition } from "./uvicorn.ts";
import { v2boardTechnologyDefinition } from "./v2board.ts";
import { varnishTechnologyDefinition } from "./varnish.ts";
import { virtuosoTechnologyDefinition } from "./virtuoso.ts";
import { w3TotalCacheTechnologyDefinition } from "./w3-total-cache.ts";
import { warpTechnologyDefinition } from "./warp.ts";
import { weblogicServerTechnologyDefinition } from "./weblogic-server.ts";
import { webrickTechnologyDefinition } from "./webrick.ts";
import { websphereTechnologyDefinition } from "./websphere.ts";
import { windowsCeTechnologyDefinition } from "./windows-ce.ts";
import { windowsServerTechnologyDefinition } from "./windows-server.ts";
import { winstoneServletContainerTechnologyDefinition } from "./winstone-servlet-container.ts";
import { wordpressSuperCacheTechnologyDefinition } from "./wordpress-super-cache.ts";
import { wpRocketTechnologyDefinition } from "./wp-rocket.ts";
import { wpcacheTechnologyDefinition } from "./wpcache.ts";
import { wpcacheonTechnologyDefinition } from "./wpcacheon.ts";
import { xamppTechnologyDefinition } from "./xampp.ts";
import { xanoTechnologyDefinition } from "./xano.ts";
import { xitamiTechnologyDefinition } from "./xitami.ts";
import { yawsTechnologyDefinition } from "./yaws.ts";
import { yunohostTechnologyDefinition } from "./yunohost.ts";
import { zendTechnologyDefinition } from "./zend.ts";
import { zopeTechnologyDefinition } from "./zope.ts";

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
	aspNetMvcTechnologyDefinition,
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
