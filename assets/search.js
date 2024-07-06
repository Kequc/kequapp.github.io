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
    const searchContainer = document.querySelector('.search-container');
    const searchInput = searchContainer.querySelector('input[type="text"]');
    const clearButton = searchContainer.querySelector('.clear-search');

    // Create search results container
    const searchResults = document.createElement('div');
    searchResults.className = 'absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 hidden';
    searchContainer.appendChild(searchResults);

    function updateSearchUI() {
        clearButton.classList.toggle('hidden', searchInput.value.length === 0);
    }

    function clearSearch() {
        searchInput.value = '';
        searchResults.classList.add('hidden');
        updateSearchUI();
        searchInput.blur();
    }

    searchInput.addEventListener('input', async (e) => {
        updateSearchUI();
        const query = e.target.value;
        const results = await search(query);

        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" group class="block p-4 hover:bg-gray-700 transition-colors duration-150">
                <div class="font-medium text-green-400 group-hover:underline">
                    ${result.title}
                </div>
                <ul class="ml-4 mt-2 space-y-1">
                    ${result.sections.map(section => `
                        <li class="text-sm text-gray-400">${section.title}</li>
                    `).join('')}
                </ul>
            </a>
        `).join('');

        searchResults.classList.remove('hidden');
    });

    clearButton.addEventListener('click', () => {
        clearSearch();
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            clearSearch();
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });

    updateSearchUI();
});
