document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // File input handling
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const uploadForm = document.getElementById('upload-form');
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
        } else {
            fileInfo.textContent = 'No file selected';
        }
    });
    
    // Drag and drop functionality
    const uploadLabel = document.querySelector('.upload-label');
    
    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.style.borderColor = '#4361ee';
        uploadLabel.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
    });
    
    uploadLabel.addEventListener('dragleave', () => {
        uploadLabel.style.borderColor = '#adb5bd';
        uploadLabel.style.backgroundColor = 'transparent';
    });
    
    uploadLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadLabel.style.borderColor = '#adb5bd';
        uploadLabel.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            const file = fileInput.files[0];
            fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
        }
    });
    
    // Form submission for file upload
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (fileInput.files.length === 0) {
            alert('Please select a file first');
            return;
        }
        
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const text = e.target.result;
            analyzeText(text);
        };
        
        reader.readAsText(file);
    });
    
    // Text analysis button
    const analyzeTextBtn = document.getElementById('analyze-text-btn');
    const textInput = document.getElementById('text-input');
    
    analyzeTextBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        
        if (text === '') {
            alert('Please enter some text to analyze');
            return;
        }
        
        analyzeText(text);
    });
    
    // Word frequency update button
    const updateFrequencyBtn = document.getElementById('update-frequency');
    
    updateFrequencyBtn.addEventListener('click', function() {
        const currentText = textInput.value.trim() || (fileInput.files.length > 0 ? '' : '');
        if (currentText) {
            analyzeText(currentText);
        }
    });
    
    // Main text analysis function
    function analyzeText(text) {
        // Basic counts
        const charCount = text.length;
        const charNoSpaces = text.replace(/\s/g, '').length;
        const words = text.trim() ? text.match(/\b(\w+)\b/g) || [] : [];
        const wordCount = words.length;
        const lineCount = text.split('\n').length;
        
        // Calculate reading time (average reading speed: 200 words per minute)
        const readingTimeMinutes = Math.ceil(wordCount / 200);
        
        // Advanced statistics
        const uniqueWords = new Set(words.map(word => word.toLowerCase()));
        const uniqueWordCount = uniqueWords.size;
        
        const wordLengths = words.map(word => word.length);
        const avgWordLength = wordLengths.length > 0 ? 
            (wordLengths.reduce((a, b) => a + b, 0)) / wordLengths.length : 0;
        
        let longestWord = '';
        words.forEach(word => {
            if (word.length > longestWord.length) {
                longestWord = word;
            }
        });
        
        // Word frequency analysis
        const wordFrequency = {};
        words.forEach(word => {
            const lowerWord = word.toLowerCase();
            wordFrequency[lowerWord] = (wordFrequency[lowerWord] || 0) + 1;
        });
        
        // Sort by frequency (descending)
        const sortedFrequency = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1]);
        
        // Filter based on user settings
        const minLength = parseInt(document.getElementById('min-length').value) || 1;
        const minFrequency = parseInt(document.getElementById('min-frequency').value) || 1;
        
        const filteredFrequency = sortedFrequency.filter(
            ([word, count]) => word.length >= minLength && count >= minFrequency
        );
        
        // Update UI
        document.getElementById('char-count').textContent = charCount.toLocaleString();
        document.getElementById('char-no-spaces').textContent = charNoSpaces.toLocaleString();
        document.getElementById('word-count').textContent = wordCount.toLocaleString();
        document.getElementById('line-count').textContent = lineCount.toLocaleString();
        document.getElementById('reading-time').textContent = 
            readingTimeMinutes === 1 ? '1 min' : `${readingTimeMinutes} mins`;
        document.getElementById('unique-words').textContent = uniqueWordCount.toLocaleString();
        document.getElementById('avg-word-length').textContent = avgWordLength.toFixed(2);
        document.getElementById('longest-word').textContent = longestWord || '-';
        
        // Update frequency table
        const frequencyTable = document.querySelector('#frequency-table tbody');
        frequencyTable.innerHTML = '';
        
        filteredFrequency.forEach(([word, count]) => {
            const row = document.createElement('tr');
            row.className = 'fade-in';
            row.innerHTML = `
                <td>${word}</td>
                <td>${count}</td>
                <td>${word.length}</td>
            `;
            frequencyTable.appendChild(row);
        });
        
        // If no words meet the criteria
        if (filteredFrequency.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3" style="text-align: center;">No words meet the current criteria</td>';
            frequencyTable.appendChild(row);
        }
        
        // Add animation to summary cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }
    
    // Helper function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});