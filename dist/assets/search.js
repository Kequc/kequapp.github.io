let searchIndex = null;

async function fetchSearchIndex() {
    if (searchIndex === null) {
        const response = await fetch('/assets/search-index.json');
        searchIndex = await response.json();
    }
    return searchIndex;
}

async function search(query) {
    const index = await fetchSearchIndex();
    return index.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.sections.some(section =>
            section.title.toLowerCase().includes(query.toLowerCase()) ||
            section.content.toLowerCase().includes(query.toLowerCase())
        )
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        const results = await search(query);
        searchResults.innerHTML = results.map(result => `
            <li class="p-4 hover:bg-gray-100">
                <a href="${result.url}" class="font-medium text-green-600 hover:underline">
                    ${result.title}
                </a>
                <ul class="ml-4 mt-2 space-y-1">
                    ${result.sections.map(section => `
                        <li class="text-sm text-gray-600">${section.title}</li>
                    `).join('')}
                </ul>
            </li>
        `).join('');
        searchResults.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
});
