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
    const found = [];

    for (const page of index) {
        if (page.title.toLowerCase().includes(query)) {
            found.push({
                title: formatContent(page.title, query),
                url: page.url,
                content: formatContent(page.sections[0].content, query),
                order: 0,
            });
        } else {
            for (const section of page.sections) {
                if (section.title.toLowerCase().includes(query)) {
                    found.push({
                        title: formatContent(page.title, query),
                        url: page.url,
                        content: formatContent(section.title, query),
                        order: 1,
                    });
                    break;
                }
                const contentIndex = section.content.toLowerCase().indexOf(query);
                if (contentIndex > -1) {

                    found.push({
                        title: formatContent(page.title, query),
                        url: page.url,
                        content: formatContent(section.content, query, contentIndex),
                        order: 2,
                    });
                    break;
                }
            }
        }
    }

    return found.sort((a, b) => a.order - b.order).slice(0, 8);
}

function formatContent(content, query, startIndex = 0) {
    return content
        .substring(startIndex, startIndex + 100)
        .replace(new RegExp(query, 'gi'), match => `<span class="bg-yellow-400 text-gray-900">${match}</span>`)
        .trim();
}

document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = searchContainer.querySelector('input[type="text"]');
    const clearButton = searchContainer.querySelector('.clear-search');

    // Create search results container
    const searchResults = document.createElement('div');
    searchResults.className = 'absolute left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 hidden';
    searchContainer.appendChild(searchResults);

    let selectedIndex = -1;

    function updateSearchUI() {
        clearButton.classList.toggle('hidden', searchInput.value.length === 0);
    }

    function clearSearch() {
        searchInput.value = '';
        searchResults.classList.add('hidden');
        updateSearchUI();
        searchInput.blur();
        selectedIndex = -1;
    }

    function updateSelectedResult() {
        const results = searchResults.querySelectorAll('a');
        results.forEach((result, index) => {
            if (index === selectedIndex) {
                result.classList.add('bg-gray-700');
            } else {
                result.classList.remove('bg-gray-700');
            }
        });
    }

    searchInput.addEventListener('input', async (e) => {
        updateSearchUI();
        const query = e.target.value ?? '';
        const results = await search(query.toLowerCase());

        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="block p-4 hover:bg-gray-700 transition-colors duration-150">
                <div class="font-medium text-green-400 group-hover:underline">
                    ${result.title}
                </div>
                <div class="text-sm text-gray-400">${result.content}</div>
            </a>
        `).join('');

        searchResults.classList.remove('hidden');
        selectedIndex = -1;
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
        const results = searchResults.querySelectorAll('a');
        const resultsCount = results.length;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % resultsCount;
                updateSelectedResult();
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + resultsCount) % resultsCount;
                updateSelectedResult();
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < resultsCount) {
                    results[selectedIndex].click();
                }
                break;
            case 'Escape':
                clearSearch();
                break;
        }
    });

    updateSearchUI();
});
