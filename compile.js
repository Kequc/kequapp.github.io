const { marked } = require('marked');
const Mustache = require('mustache');
const fsx = require('fs-extra');
const path = require('path');
const beautify = require('js-beautify').html;

const VERSION = '0.7.0';

async function getDirectories(dir) {
    return (await fsx.readdir(dir, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

async function getFiles(dir) {
    return await fsx.readdir(dir);
}

async function readFile(filePath) {
    return await fsx.readFile(filePath, 'utf8');
}

function formatCategoryName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function getContent(baseDir) {
    const categories = await getDirectories(baseDir);
    let pages = {};
    let searchIndex = [];

    // get the index page from /content/index.md
    const indexContent = await readFile(path.join(baseDir, 'index.md'));
    const { title, content } = extractTitleAndContent(indexContent);
    pages['index'] = {
        title,
        content,
        categoryName: '',
        fileName: 'index',
        fileOrder: 0
    };

    for (const category of categories) {
        const [_, categoryOrder, categoryName] = category.match(/^(\d+)-(.+)$/);
        const formattedCategoryName = formatCategoryName(categoryName);
        const categoryDir = path.join(baseDir, category);
        const files = await getFiles(categoryDir);

        // Add category index page
        pages[`${categoryName}/index`] = {
            title: formattedCategoryName,
            content: 'Choose a topic from the sidebar.',
            categoryName,
            formattedCategoryName,
            fileName: 'index',
            fileOrder: 0
        };

        for (const file of files) {
            if (path.extname(file).toLowerCase() !== '.md') continue;

            const [__, fileOrder, fileName] = file.match(/^(\d+)-(.+)\.md$/);
            const filePath = path.join(categoryDir, file);
            const fileContent = await readFile(filePath);
            const { title, content } = extractTitleAndContent(fileContent);

            const key = `${categoryName}/${fileName}`;
            pages[key] = {
                title,
                content,
                categoryOrder: parseInt(categoryOrder),
                categoryName,
                formattedCategoryName,
                fileOrder: parseInt(fileOrder),
                fileName
            };

            searchIndex.push({
                title,
                url: `/${key}.html`,
                sections: extractSections(content)
            });
        }
    }

    return { pages, searchIndex };
}

function extractTitleAndContent(fileContent) {
    const lines = fileContent.split('\n');
    const title = lines[0].replace(/^#\s*/, '').trim();
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
}

function extractSections(content) {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = null;

    lines.forEach(line => {
        const match = line.match(/^(#{2,6})\s+(.+)$/);
        if (match) {
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = { title: match[2], content: '' };
        } else if (currentSection) {
            currentSection.content += line + '\n';
        }
    });

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

async function generateSidebar(pages, activePage) {
    const categoriesMap = {};

    // Group pages by category
    Object.values(pages).forEach(page => {
        // Skip the main index page and category index pages
        if (page.fileName === 'index') return;

        if (!categoriesMap[page.categoryName]) {
            categoriesMap[page.categoryName] = {
                name: page.formattedCategoryName,
                items: []
            };
        }
        categoriesMap[page.categoryName].items.push({
            url: `/${page.categoryName}/${page.fileName}.html`,
            title: page.title,
            order: page.fileOrder,
            active: `${page.categoryName}/${page.fileName}` === activePage
        });
    });

    // Convert to array and sort categories
    const categoriesArray = Object.values(categoriesMap).sort((a, b) => {
        return a.items[0].order - b.items[0].order;
    });

    // Sort items within each category
    categoriesArray.forEach(category => {
        category.items.sort((a, b) => a.order - b.order);
    });

    const template = await readFile(path.join(__dirname, 'templates', 'sidebar.mustache'));
    return Mustache.render(template, { categories: categoriesArray });
}

async function compilePages(pages) {
    const layoutTemplate = await readFile(path.join(__dirname, 'templates', 'layout.mustache'));

    return Promise.all(Object.entries(pages).map(async ([key, value]) => {
        const sidebar = await generateSidebar(pages, key);
        const content = marked.parse(value.content);

        let html = Mustache.render(layoutTemplate, {
            title: value.title,
            content,
            sidebar,
            version: VERSION
        });

        html = beautify(html, { max_preserve_newlines: 0 });

        return { key, html };
    }));
}

async function writeCompiledPages(compiled) {
    await Promise.all(compiled.map(async ({ key, html }) => {
        const filePath = path.join('./dist', `${key}.html`);
        await fsx.outputFile(filePath, html, 'utf8');
    }));
}

async function copyAssets() {
    await fsx.copy('./assets', './dist/assets');
}

async function main() {
    await fsx.emptyDir('./dist');
    const { pages, searchIndex } = await getContent('./content');
    const compiled = await compilePages(pages);
    await writeCompiledPages(compiled);
    await fsx.writeJson('./assets/search-index.json', searchIndex);
    await copyAssets();
    console.log('Built successfully!');
}

main().catch(console.error);
