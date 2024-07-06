import fsx from 'fs-extra';
import path from 'path';

export default async function getContent() {
    const directories = await fsx.readdir('./content');
    const categories = await Promise.all(directories.map(buildCategory));

    for (const category of categories) {
        category.pages.sort((a, b) => a.order - b.order);
    }
    categories.sort((a, b) => a.order - b.order);

    return categories;
}

async function buildCategory(directory) {
    const [_, categoryOrder, directorySlug] = directory.match(/^(\d+)-(.+)$/);
    const categoryTitle = formatCategory(directorySlug);
    const files = await fsx.readdir(path.join('./content', directory));
    const pages = await Promise.all(files.map(file => buildPage(directory, file)));

    return {
        slug: directorySlug,
        title: categoryTitle,
        order: parseInt(categoryOrder, 10),
        pages,
    };
}

async function buildPage(directory, file) {
    const [__, order, fileSlug] = file.match(/^(\d+)-(.+)\.md$/);
    const filePath = path.join('./content', directory, file);
    const fileContent = await fsx.readFile(filePath, 'utf8');
    const { title, content } = extractTitleAndContent(fileContent);

    return {
        slug: fileSlug,
        title,
        order: parseInt(order, 10),
        content,
    };
}

function extractTitleAndContent(fileContent) {
    const lines = fileContent.split('\n');
    const title = lines[0].replace(/^#\s*/, '').trim();
    const content = lines.slice(1).join('\n').trim();

    return { title, content };
}

function formatCategory(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
