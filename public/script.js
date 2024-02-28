document.getElementById('textForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const textInput = document.getElementById('textInput').value;
    const generatedImage = document.getElementById('generatedImage');
    
    try {
        const response = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: textInput
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        generatedImage.src = data.imageUrl;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
