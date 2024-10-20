
if(!self.define){let e,t={};const s=(s,a)=>(s=new URL(s+".js",a).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(t[n])return;let c={};const r=e=>s(e,n),u={module:{uri:n},exports:c,require:r};t[n]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4d767a27"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7e527a6cbe5bbc230bae4f343212914d"},{url:"/_next/static/ItZVSVtywuhetOg2Fl8mg/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/ItZVSVtywuhetOg2Fl8mg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/138-f6004cce9fe48681.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/170-3638e403fa130005.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/172-9750d5e54fba8e0f.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/23-b189078c711d64d1.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/231-ae270a08413ba73e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/325-3560eb7092e395d1.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/421-5dad004b6c121b29.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/472-342bba70fd65bee2.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/495-426ce6847a404656.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/545-260a6d7e784652da.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/637-71a08e23a3baf259.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/659-0a3a5c13e8c1b94c.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/762-5ecbd0b39447223e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/877-f309e0463694a624.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/891-05cbfb8f6fb1d392.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/921-859a3d571018c882.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/950-fd450ff0923e766a.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/986-4a85d8c759e7194b.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/992-3e96134d989df0af.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/_not-found/page-d02a23abc8254d8f.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/admin/main/employees/page-e0d94f63795ae5be.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/admin/main/layout-ae3703ac8ebe8a9e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/admin/main/page-678f9ca88e31103c.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/admin/main/stores/page-b23b6e0822b178e9.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/admin/main/trainers/page-80353d6cb1553d0e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/customers/page-fc1f301fd4969a4e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/employees/page-996566ca61512ae8.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/layout-fca2a937d7d2b90a.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/orders/page-0f3d0f12e4aac39e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/page-95de4b973cb30cc1.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/main/products/page-4b41477f4b87e641.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/customer/signup/page-51640f3f5a4d1889.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/layout-4995e6e07ec4c7ab.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/app/login/page-bd0a8119e584ef41.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/fd9d1056-fde66be5d4af255a.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/main-300107f9caecf435.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/main-app-1ca5478622f31dad.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-59a9d3c00cffdcc0.js",revision:"ItZVSVtywuhetOg2Fl8mg"},{url:"/_next/static/css/2839e6e2c186f316.css",revision:"2839e6e2c186f316"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/9fda420b56679d24.css",revision:"9fda420b56679d24"},{url:"/_next/static/css/fa01b43fe076afba.css",revision:"fa01b43fe076afba"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/0a03a6d30c07af2e-s.woff2",revision:"79da53ebaf3308c806394df4882b343d"},{url:"/_next/static/media/1cd7bc22440aeaea-s.woff2",revision:"802e1a0c6cfbb31e39e033a4c7ae9209"},{url:"/_next/static/media/30cd8f99d32fa6e8-s.woff2",revision:"e5c1b944d9e3380a062bf911e26728a3"},{url:"/_next/static/media/32091f7180d8abc1-s.p.woff2",revision:"3ae11ad60cf3813cff9f37bf54f3cd5b"},{url:"/_next/static/media/344873b55f9c7815-s.woff2",revision:"b2f219e89fc780ac096c5dedecd0bc49"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/8d346445d24062b5-s.woff2",revision:"c965abed1310982a4d2148cb81765b56"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/9fb43f616ebea520-s.woff2",revision:"78b8d1ea0ad989110f4fa83054146ceb"},{url:"/_next/static/media/Avatar.fb3601cf.svg",revision:"5fbec532287b04857fafb3a464314d35"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f5767adec246cdc1-s.woff2",revision:"7a1c6501aa2b3327c1cf556362a851cb"},{url:"/_next/static/media/f7099cae2a5aa83f-s.woff2",revision:"8717ab2d20ae5ec51c6ac277e0331511"},{url:"/_next/static/media/img.79b76569.svg",revision:"816eb53da7c45165c030815497bb919a"},{url:"/_next/static/media/logo.26c63dec.svg",revision:"4b651c2c59b7d6b760d5d7e9722dd16e"},{url:"/_next/static/media/logout-icon.fb8e136e.svg",revision:"f415f2b4c164958e00541e4c092f86e4"},{url:"/icons/Untitled_design-128.png",revision:"6f147c9f569c75dfb4383875efec2a8b"},{url:"/icons/Untitled_design-144.png",revision:"3d77c0186b6571cf71a4f1b3d1769700"},{url:"/icons/Untitled_design-152.png",revision:"62a45fe69fb3f3b8a6145ba344e547a3"},{url:"/icons/Untitled_design-16.png",revision:"654d21416a47d29355878918ccb5ac66"},{url:"/icons/Untitled_design-180.png",revision:"0f38bf1c03ef31e4dd73c2b504dfab57"},{url:"/icons/Untitled_design-192.png",revision:"640c5be47c07f73ccd8af29f5defa529"},{url:"/icons/Untitled_design-256.png",revision:"3a32f8681f88eed084f1018c1bf6cc18"},{url:"/icons/Untitled_design-48.png",revision:"b2c34842045ed76c1f81151fa5cdf075"},{url:"/icons/Untitled_design-512.png",revision:"d652f8aafacfd2389017bb31643c0d1b"},{url:"/icons/Untitled_design-64.png",revision:"f8e6eef7b2eb86937e597c80c0560178"},{url:"/icons/Untitled_design-72.png",revision:"544addf361b8db892842a9a1450b667e"},{url:"/icons/Untitled_design-96.png",revision:"ccd38286ace1fe7f30ff92996bbfc188"},{url:"/manifest.json",revision:"a70124c4beb262b264b8457d4bc45641"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:a})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-e639beba'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));

