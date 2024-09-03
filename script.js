document.addEventListener('DOMContentLoaded', () => {
    // Function to dynamically add Google Fonts using a <link> tag
    function addGoogleFonts() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Allison&display=swap';
        document.head.appendChild(link);
    }

    // Call the function to add Google Fonts
    addGoogleFonts();

    // Check if we're on the name entry page
    if (document.getElementById('nameForm')) {
        document.getElementById('nameForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('nameInput').value;
            if (name) {
                localStorage.setItem('inviteName', name);
                window.location.href = 'invite.html';
            }
        });
    }

    // Check if we're on the invite page
    if (document.getElementById('inviteCanvas')) {
        const inviteName = localStorage.getItem('inviteName');
        const canvas = document.getElementById('inviteCanvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = 'YB.jpg';  // Path to your invite card image

        img.onload = function() {
            // Set canvas size to match the image size
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Set font properties for canvas rendering
            ctx.font = '225px Allison'; // Use the Google Font
            ctx.fillStyle = '#f0d2a4'; // Text color
            ctx.textAlign = 'center'; // Center align text

            // Coordinates where you want to place the text
            const x = canvas.width / 2; // Center horizontally
            const y = canvas.height / 1.47; // Adjust vertical positioning as needed

            // Draw the text on the canvas
            ctx.fillText(inviteName, x, y); // Adjust y for vertical positioning
        };

        document.getElementById('downloadButton').addEventListener('click', () => {
            const { jsPDF } = window.jspdf;

            // Create a new PDF instance with dimensions matching the canvas
            const pdf = new jsPDF({
                unit: 'px', // Use pixel units
                format: [canvas.width, canvas.height] // Set the PDF dimensions to match the canvas
            });

            // Convert canvas to image data URL
            const imgData = canvas.toDataURL('image/jpeg');
            
            // Add the image to the PDF and set dimensions to match the canvas
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);

            // Save the PDF
            pdf.save('invite-card.pdf');
        });
    }
});
