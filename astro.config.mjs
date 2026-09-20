// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zlbotanicals.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      // Match only the new tea hubs and ginseng articles to their slashless canonicals; leave legacy URLs intact.
      serialize(item) {
        const teaHub = /^https:\/\/zlbotanicals\.com\/(?:zh\/)?(?:products\/tea-extracts|resources\/blog\/(?:ginseng-heat-bitterness|uk-sdil-milk-tea-2028))\/$/;
        if (!teaHub.test(item.url)) return item;
        return {
          ...item,
          url: item.url.slice(0, -1),
          links: item.links?.map(link => ({
            ...link,
            url: teaHub.test(link.url) ? link.url.slice(0, -1) : link.url,
          })),
        };
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
        },
      },
    })
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
