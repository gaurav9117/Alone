document.getElementById('textForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const textInput = document.getElementById('textInput').value;
      const generatedImage = document.getElementById('generatedImage');
      
      try {
          const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer tocken',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  inputs: textInput
              })
          });
          
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          generatedImage.src = imageUrl;
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
  });
  
