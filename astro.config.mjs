import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightUtils from "@lorenzo_lewis/starlight-utils";
// import starlightLinksValidator from 'starlight-links-validator';
// import starlightImageZoom from 'starlight-image-zoom';
// import starWarp from '@inox-tools/star-warp';

import react from "@astrojs/react";
import linkCard from "astro-link-card";
import tailwind from "@astrojs/tailwind";
import webVitals from "@astrojs/web-vitals";
import db from "@astrojs/db";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentLayer: true,
    contentIntellisense: true
  },
  site: 'https://cursor-japan.org',
  integrations: [starlight({
    favicon: '/favicon.png',
    plugins: [starlightBlog(), starlightUtils({
      navLinks: {
        leading: {
          useSidebarLabelled: "leadingNavLinks"
        }
      }
    })
    // starlightLinksValidator(), 
    //starWarp()
    ],
    customCss: ['./src/tailwind.css'],
    title: 'Cursor Japan Community',
    editLink: {
      baseUrl: 'https://github.com/cursor-japan/cursor-japan-site/edit/main/'
    },
    logo: {
      src: '/src/assets/cursor-japan-app-logo.svg'
    },
    defaultLocale: "root",
    locales: {
      root: {
        label: '日本語',
        lang: 'ja'
      }
    },
    social: {
      github: 'https://github.com/cursor-japan/cursor-japan-site',
      "x.com": 'https://x.com/cursor_japan'
      // "openCollective": 'https://opencollective.com/cursor-japan'
    },
    components: {
      Pagination: "./src/components/CustomPagination.astro"
    },
    sidebar: [{
      label: "leadingNavLinks",
      items: [{
        label: "Docs!",
        link: "/docs"
      }, {
        label: "References!",
        link: "/references"
      }]
    }, {
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        slug: 'guides/example'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), react(), linkCard(), tailwind({
    applyBaseStyles: false
  }), webVitals(), db()],
  output: "server",
  adapter: cloudflare({
    imageService: 'cloudflare'
  })
});