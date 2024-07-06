import fsx from 'fs-extra';
import path from 'path';
import { DIST_FOLDER } from '../../constants.js';

export default async function compileSearchIndex(categories) {
    const searchIndex = categories.map(category => {
        return category.pages.map(page => ({
            title: page.title,
            url: `/${category.slug}/${page.slug}.html`,
            sections: extractSections(page.content)
        }));
    }).flat();

    await writeSearchIndex(searchIndex);
}

async function writeSearchIndex(searchIndex) {
    const filePath = path.join(DIST_FOLDER, 'assets', 'search-index.json');
    await fsx.writeJson(filePath, searchIndex);
}

function extractSections(content) {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = null;

    for (const line of lines) {
        const match = line.match(/^(#{2,6})\s+(.+)$/);
        if (match) {
            if (currentSection) sections.push(currentSection);
            currentSection = { title: match[2], content: '' };
        } else if (currentSection) {
            currentSection.content += line + '\n';
        }
    }

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}
