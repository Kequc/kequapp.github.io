import fsx from 'fs-extra';
import path from 'path';
import removeMd from 'remove-markdown';
import { DIST_FOLDER, INDEX_URL } from '../../constants.js';

export default async function compileSearchIndex(categories) {
    const searchIndex = categories.map(category => {
        return category.pages.map(page => ({
            title: page.title,
            url: getUrl(category.slug, page.slug),
            sections: extractSections(page.title, page.content),
        }));
    }).flat();

    await writeSearchIndex(searchIndex);
}

async function writeSearchIndex(searchIndex) {
    const filePath = path.join(DIST_FOLDER, 'assets', 'search-index.json');
    await fsx.writeJson(filePath, searchIndex);
}

// strip markdown from the page content
// collate text into sections based on headings
function extractSections(title, content) {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = { title, content: '' };

    function pushCurrentSection() {
        if (currentSection) {
            // replace any number of newlines with a space
            currentSection.content = removeMd(currentSection.content)
                .replace(/\n+/g, ' ')
                .trim();
            sections.push(currentSection);
        }
    }

    for (const line of lines) {
        const match = line.match(/^(#{2,6})\s+(.+)$/);
        if (match) {
            pushCurrentSection();
            currentSection = { title: match[2], content: '' };
        } else if (currentSection) {
            currentSection.content += line.trim() + '\n';
        }
    }

    pushCurrentSection();

    return sections;
}

function getUrl(categorySlug, pageSlug) {
    const url = `/${categorySlug}/${pageSlug}.html`;
    return INDEX_URL === url ? '/' : url;
}
