
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
//# sourceMappingURL=sw.js.map

if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),u={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>u[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4d767a27"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2620b2116e703eb3bea179a27225d2fa"},{url:"/_next/static/chunks/130-a6d4aec5e9c0bc56.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/138-f6004cce9fe48681.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/172-b4721727931e605b.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/21-03787a4bada21ee7.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/23-32ae35d7154012be.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/357-deff91eaa3af63f6.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/436-bf50c14afc5c3b46.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/472-d5630a4327d12d47.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/495-52229b04b7315f19.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/545-9e46069db5ff196c.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/659-d85bdda1c18bb2ec.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/712-9c0c9ee7ac741213.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/762-5ecbd0b39447223e.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/834-6cc7e3bdc9e24788.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/877-f309e0463694a624.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/950-fd450ff0923e766a.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/951-bda855f341e78466.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/986-01d76357baa3b3eb.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/_not-found/page-d02a23abc8254d8f.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/login/page-3a14977372aa1cb9.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/main/employees/page-4fa44458b1304936.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/main/layout-c7224d53dea21a80.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/main/page-88bd82194eb256d4.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/main/stores/page-106efd89b4089abf.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/main/trainers/page-74a8c57e8b093481.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/admin/signup/page-2e463b933a33cd9e.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/customers/page-9c5a2ac5a1779488.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/employees/page-c4c40dddfac175b3.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/layout-9dfe2e2195a709d2.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/orders/page-6770f941e54cd737.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/page-c4328c1914e152f8.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/main/products/page-eb643a17c5190bd2.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/customer/signup/page-b3c3f10d53a69233.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/layout-e80dda0732da796b.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/app/login/page-05fceb06a48ed5d5.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/fd9d1056-fde66be5d4af255a.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/main-73e5657c11d3b8b7.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/main-app-26b6bc1877a4dd4a.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-cba826aa050ba071.js",revision:"qMTuFRNBtK5QIhV-_IxMw"},{url:"/_next/static/css/2839e6e2c186f316.css",revision:"2839e6e2c186f316"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/838d455841193d1d.css",revision:"838d455841193d1d"},{url:"/_next/static/media/1cd7bc22440aeaea-s.woff2",revision:"802e1a0c6cfbb31e39e033a4c7ae9209"},{url:"/_next/static/media/32091f7180d8abc1-s.p.woff2",revision:"3ae11ad60cf3813cff9f37bf54f3cd5b"},{url:"/_next/static/media/344873b55f9c7815-s.woff2",revision:"b2f219e89fc780ac096c5dedecd0bc49"},{url:"/_next/static/media/9fb43f616ebea520-s.woff2",revision:"78b8d1ea0ad989110f4fa83054146ceb"},{url:"/_next/static/media/Avatar.fb3601cf.svg",revision:"5fbec532287b04857fafb3a464314d35"},{url:"/_next/static/media/img.79b76569.svg",revision:"816eb53da7c45165c030815497bb919a"},{url:"/_next/static/media/logo.26c63dec.svg",revision:"4b651c2c59b7d6b760d5d7e9722dd16e"},{url:"/_next/static/media/logout-icon.fb8e136e.svg",revision:"f415f2b4c164958e00541e4c092f86e4"},{url:"/_next/static/qMTuFRNBtK5QIhV-_IxMw/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/qMTuFRNBtK5QIhV-_IxMw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/Untitled_design-128.png",revision:"6f147c9f569c75dfb4383875efec2a8b"},{url:"/icons/Untitled_design-144.png",revision:"3d77c0186b6571cf71a4f1b3d1769700"},{url:"/icons/Untitled_design-152.png",revision:"62a45fe69fb3f3b8a6145ba344e547a3"},{url:"/icons/Untitled_design-16.png",revision:"654d21416a47d29355878918ccb5ac66"},{url:"/icons/Untitled_design-180.png",revision:"0f38bf1c03ef31e4dd73c2b504dfab57"},{url:"/icons/Untitled_design-192.png",revision:"640c5be47c07f73ccd8af29f5defa529"},{url:"/icons/Untitled_design-256.png",revision:"3a32f8681f88eed084f1018c1bf6cc18"},{url:"/icons/Untitled_design-48.png",revision:"b2c34842045ed76c1f81151fa5cdf075"},{url:"/icons/Untitled_design-512.png",revision:"d652f8aafacfd2389017bb31643c0d1b"},{url:"/icons/Untitled_design-64.png",revision:"f8e6eef7b2eb86937e597c80c0560178"},{url:"/icons/Untitled_design-72.png",revision:"544addf361b8db892842a9a1450b667e"},{url:"/icons/Untitled_design-96.png",revision:"ccd38286ace1fe7f30ff92996bbfc188"},{url:"/manifest.json",revision:"a70124c4beb262b264b8457d4bc45641"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
 
