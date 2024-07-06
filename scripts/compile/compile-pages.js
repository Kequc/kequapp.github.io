import fsx from 'fs-extra';
import path from 'path';
import beautify from 'js-beautify';
import { marked } from 'marked';
import Mustache from 'mustache';
import { VERSION, INDEX_URL } from '../../constants.js';

export default async function compilePages(categories) {
    const templatePath = path.join('./templates', 'layout.mustache');
    const template = await fsx.readFile(templatePath, 'utf8');
    const rendered = await Promise.all(categories.map(categoryRenderer(template, categories)));
    const pages = rendered.reduce((acc, page) => ({ ...acc, ...page }), {});

    await writePages(pages);
}

async function writePages(pages) {
    await Promise.all(Object.keys(pages).map(async (key) => {
        const html = pages[key];
        const filePath = path.join('./dist', key === INDEX_URL ? 'index.html' : key);
        await fsx.outputFile(filePath, html, 'utf8');
    }));
}

function categoryRenderer(template, categories) {
    return async function (category) {
        const pages = [buildCategoryIndex(category), ...category.pages];
        const rendered = await Promise.all(pages.map(page => {
            return beautify.html(Mustache.render(template, {
                title: page.title,
                content: marked.parse(page.content),
                sidebar: getSidebar(categories, category.slug, page.slug),
                version: VERSION,
            }), {
                max_preserve_newlines: 0,
            });
        }));

        return pages.reduce((acc, page, index) => {
            acc[`/${category.slug}/${page.slug}.html`] = rendered[index];
            return acc;
        }, {});
    };
}

function buildCategoryIndex(category) {
    return {
        slug: 'index',
        title: category.title,
        content: 'Choose a topic from the sidebar.',
    };
}

function getSidebar(categories, categorySlug, pageSlug) {
    return categories.map(category => ({
        categoryTitle: category.title,
        pages: category.pages.map(page => ({
            pageUrl: getPageUrl(category.slug, page.slug),
            pageTitle: page.title,
            active: category.slug === categorySlug && page.slug === pageSlug,
        })),
    }));
}

function getPageUrl(categorySlug, pageSlug) {
    const url = `/${categorySlug}/${pageSlug}.html`;
    return INDEX_URL === url ? '/' : url;
}
