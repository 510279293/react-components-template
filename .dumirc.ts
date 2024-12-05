import { defineConfig } from 'dumi';

const nav = [
  { title: '设计', link: '/spec/introduce' },
  { title: '研发', link: '/react/introduce' },
  { title: '组件', link: '/components/button' },
  { title: '博客', link: '/blog' },
  { title: '资源', link: '/resources' },
]

const metas = [
  {name: 'referrer', content: 'no-referrer'}
]

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '@junc/rc',
    nav
  },
  metas
  // resolve: {
  //   docDirs: [{ type: 'doc', dir: 'docs' }],
  //   atomDirs: [{ type: 'component', dir: 'components' }],
  //   codeBlockMode: 'passive',
  // },
});
