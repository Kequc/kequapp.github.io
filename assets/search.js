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
    const searchInput = document.getElementById('search-bar');
    const searchContainer = searchInput.closest('.relative');

    // Create search results container
    const searchResults = document.createElement('div');
    searchResults.className = 'absolute left-0 right-0 mt-2 bg-green-700 rounded-lg shadow-lg overflow-hidden z-20 hidden';
    searchContainer.appendChild(searchResults);

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        const results = await search(query);
        searchResults.innerHTML = results.map(result => `
            <div class="p-4 hover:bg-green-600 transition-colors duration-150">
                <a href="${result.url}" class="font-medium text-white hover:underline">
                    ${result.title}
                </a>
                <ul class="ml-4 mt-2 space-y-1">
                    ${result.sections.map(section => `
                        <li class="text-sm text-green-200">${section.title}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
        searchResults.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Add focus and blur events to handle keyboard navigation
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            searchResults.classList.remove('hidden');
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.classList.add('hidden');
        }
    });
});
