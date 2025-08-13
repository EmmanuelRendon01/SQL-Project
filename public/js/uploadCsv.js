const form = document.getElementById('csvForm');

// Form to add all csv data to an endpoint to use that to upload the data in the db

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tableName = document.getElementById('tableName').value.trim();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`http://localhost:9000/api/files/?table=${tableName}`, {
            method: 'POST',
            body: formData
        });

        console.log("Exito");
        
    } catch (err) {
        console.log(err);
        
    }
});
