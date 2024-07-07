import fsx from 'fs-extra';
import path from 'path';
import getContent from './compile/get-content.js';
import compilePages from './compile/compile-pages.js';
import compileSearchIndex from './compile/compile-search-index.js';
import { ASSETS_FOLDER, DIST_FOLDER } from '../constants.js';

async function main() {
    await fsx.emptyDir(DIST_FOLDER);
    await fsx.copy(ASSETS_FOLDER, path.join(DIST_FOLDER, ASSETS_FOLDER));
    await fsx.copyFile('./CNAME', path.join(DIST_FOLDER, 'CNAME'));

    const content = await getContent();
    await compilePages(content);
    await compileSearchIndex(content);

    console.log('Built successfully!');
}

main().catch(console.error);
