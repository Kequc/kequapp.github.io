import fsx from 'fs-extra';
import getContent from './compile/get-content.js';
import compilePages from './compile/compile-pages.js';
import compileSearchIndex from './compile/compile-search-index.js';

async function main() {
    await fsx.emptyDir('./dist');
    await fsx.copy('./assets', './dist/assets');

    const content = await getContent();
    await compilePages(content);
    await compileSearchIndex(content);

    console.log('Built successfully!');
}

main().catch(console.error);
