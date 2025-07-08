document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('evaluation-form');
    const submitBtn = form.querySelector('.submit-btn');

    const fileInputs = [
        {
            section: document.getElementById('question-paper-section'),
            input: document.getElementById('question-paper-input'),
            file: null
        },
        {
            section: document.getElementById('model-answer-section'),
            input: document.getElementById('model-answer-input'),
            file: null
        }
    ];

    fileInputs.forEach(item => {
        const label = item.section.querySelector('.file-label');
        const display = item.section.querySelector('.file-info-display');

        // The `for` attribute on the label handles the click.
        // The `change` event on the input handles the file selection.
        // No extra JS is needed for the click to work.

        // Handle drag and drop
        label.addEventListener('dragover', (e) => {
            e.preventDefault();
            label.classList.add('dragover');
        });

        label.addEventListener('dragleave', () => {
            label.classList.remove('dragover');
        });

        label.addEventListener('drop', (e) => {
            e.preventDefault();
            label.classList.remove('dragover');
            const droppedFiles = e.dataTransfer.files;
            if (droppedFiles.length > 0) {
                item.input.files = droppedFiles;
                // Manually trigger the change event so our handler below catches it
                const changeEvent = new Event('change', { bubbles: true });
                item.input.dispatchEvent(changeEvent);
            }
        });

        // Handle file selection via input
        item.input.addEventListener('change', (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                handleFileChange(item, selectedFile);
            }
        });

        // Handle file deletion
        display.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                item.file = null;
                item.input.value = ''; // Clear the file input
                display.style.display = 'none';
                label.style.display = 'flex';
                updateSubmitButtonState();
            }
        });
    });

    function handleFileChange(item, file) {
        item.file = file;
        const display = item.section.querySelector('.file-info-display');
        const label = item.section.querySelector('.file-label');

        display.innerHTML = `
            <i class='bx bxs-file-check'></i>
            <span>${file.name}</span>
            <i class='bx bxs-trash-alt delete-btn'></i>
        `;
        display.style.display = 'flex';
        label.style.display = 'none';
        updateSubmitButtonState();
    }

    function updateSubmitButtonState() {
        const allFilesUploaded = fileInputs.every(item => item.file !== null);
        submitBtn.disabled = !allFilesUploaded;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // Simulate processing delay
            setTimeout(() => {
                alert('Evaluation submitted successfully!');
                // Here you would typically send data to a server
                // For now, we'll just reset the form
                form.reset();
                fileInputs.forEach(item => {
                    const display = item.section.querySelector('.file-info-display');
                    const label = item.section.querySelector('.file-label');
                    item.file = null;
                    item.input.value = '';
                    display.style.display = 'none';
                    label.style.display = 'flex';
                });
                submitBtn.textContent = 'Submit for Evaluation';
                updateSubmitButtonState();
            }, 2000);
        }
    });

    // Initial state
    updateSubmitButtonState();
});
