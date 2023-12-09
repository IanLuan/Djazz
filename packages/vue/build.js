import esbuild from 'esbuild';
import vuePlugin from 'esbuild-vue';

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  plugins: [vuePlugin()],
});