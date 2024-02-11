document.getElementById('submitButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;
    try {
        const response = await fetch(`/search?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const titlesElement = document.getElementById('titles');
        titlesElement.innerHTML = '';
        data.titles.forEach(title => {
            const titleElement = document.createElement('div');
            titleElement.textContent = title;
            titlesElement.appendChild(titleElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
