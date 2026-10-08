// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

const section = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
  site: 'https://timothy-agent.github.io',
  base: '/docs',
  integrations: [
    starlight({
      title: 'Timothy',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/timothy-agent/timothy' },
      ],
      editLink: {
        baseUrl: 'https://github.com/timothy-agent/docs/edit/main/',
      },
      customCss: ['./src/styles/custom.css'],
      plugins: [starlightLinksValidator()],
      sidebar: [
        section('Install', 'install'),
        section('First run', 'first-run'),
        section('Concepts', 'concepts'),
        section('Connectors and channels', 'connectors'),
        section('Settings reference', 'settings'),
        section('Troubleshooting', 'troubleshooting'),
        section('Release notes', 'release-notes'),
      ],
    }),
  ],
});
