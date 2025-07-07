document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.getElementById('page-content');
    const pageTitle = document.getElementById('page-title');
    const navLinks = document.querySelectorAll('.nav-link');

    const pages = {
        
        upload: `
            <div class="card">
                <h3>Upload Documents</h3>
                <form>
                    <div class="form-group">
                        <label for="question-paper">Question Paper</label>
                        <input type="file" id="question-paper" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="model-answer">Model Answer</label>
                        <input type="file" id="model-answer" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="rubric">Evaluation Rubric</label>
                        <textarea id="rubric" rows="6" class="form-control" placeholder="Enter the evaluation rubric here..."></textarea>
                    </div>
                    <button type="submit" class="btn">Submit for Evaluation</button>
                </form>
            </div>
        `,
        evaluation: `
            <div class="card">
                <h3>Evaluation Details</h3>
                <div class="evaluation-grid">
                    <div>
                        <h4>Student's Answer</h4>
                        <p>Select an evaluation to see the student's answer.</p>
                    </div>
                    <div>
                        <h4>Model Answer</h4>
                        <p>Select an evaluation to see the model answer.</p>
                    </div>
                </div>
                <div class="card mt-4">
                    <h4>AI Feedback (Editable)</h4>
                    <div class="feedback-score">--/100</div>
                    <div class="form-group mt-2">
                        <label for="whats-missing">What's Missing:</label>
                        <textarea id="whats-missing" rows="3" class="form-control" placeholder="AI feedback on what's missing will appear here..."></textarea>
                    </div>
                    <div class="form-group mt-2">
                        <label for="suggestions">Suggestions for Improvement:</label>
                        <textarea id="suggestions" rows="3" class="form-control" placeholder="AI suggestions for improvement will appear here..."></textarea>
                    </div>
                </div>
                <div class="card mt-4">
                    <h4>Override Grade</h4>
                    <div class="form-group">
                        <label for="override-score">New Score</label>
                        <input type="number" id="override-score" class="form-control" placeholder="Enter new score">
                    </div>
                    <button class="btn">Update Score & Feedback</button>
                </div>
            </div>
        `
    };

    function loadPage(page) {
        pageContent.innerHTML = pages[page];
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            loadPage(page);
        });
    });

    // Load the default page
    loadPage('upload');
});
