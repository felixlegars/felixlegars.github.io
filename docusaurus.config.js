// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import dotenv from 'dotenv';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import remarkEncadre from './src/plugins/remark-encadre.js';
import {themes as prismThemes} from 'prism-react-renderer';

dotenv.config({path: '.env.local'});

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Espace élèves',
  tagline: 'Apprendre l’informatique en pratiquant',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://felixlegars.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'felixlegars', // Usually your GitHub org/user name.
  projectName: 'felixlegars.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  customFields: {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'cours',
          editUrl: undefined,
		  remarkPlugins: [remarkMath, remarkDirective, remarkEncadre],
		  rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Espace élèves 💻',
        logo: {
          alt: 'Icône ordinateur',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'nsiPremiereSidebar',
            label: '📘 1NSI',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'sntSidebar',
            label: '🌐 SNT',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'nsiTerminaleSidebar',
            label: '🚀 TNSI',
            position: 'left',
          },
          {
            to: '/a-propos',
            label: '👋 À propos',
            position: 'left',
          },
          {
            to: '/compte',
            label: '👤 Compte',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Apprendre',
            items: [
              {label: '📘 1NSI', to: '/cours'},
              {label: '🌐 SNT', to: '/cours/snt'},
              {label: '🚀 TNSI', to: '/cours/tnsi'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Espace élèves.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
	stylesheets: [
		{
			href: 'https://cdn.jsdelivr.net/npm/katex@0.16.47/dist/katex.min.css',
			type: 'text/css',
		},
	],
};

export default config;
