<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text File Word Counter</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fas fa-file-word"></i> Text File Word Counter</h1>
            <p>Upload a text file or paste your text to analyze word count, character count, and more</p>
        </header>

        <div class="app-container">
            <div class="input-section">
                <div class="tabs">
                    <button class="tab-btn active" data-tab="upload-tab"><i class="fas fa-upload"></i> Upload File</button>
                    <button class="tab-btn" data-tab="paste-tab"><i class="fas fa-paste"></i> Paste Text</button>
                </div>

                <div id="upload-tab" class="tab-content active">
                    <form id="upload-form" enctype="multipart/form-data">
                        <div class="file-upload">
                            <input type="file" id="file-input" accept=".txt,.text,.csv,.log,.md" required>
                            <label for="file-input" class="upload-label">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Choose a text file or drag it here</span>
                            </label>
                            <div class="file-info" id="file-info">No file selected</div>
                        </div>
                        <button type="submit" class="analyze-btn"><i class="fas fa-chart-bar"></i> Analyze File</button>
                    </form>
                </div>

                <div id="paste-tab" class="tab-content">
                    <textarea id="text-input" placeholder="Paste your text here..."></textarea>
                    <button id="analyze-text-btn" class="analyze-btn"><i class="fas fa-chart-bar"></i> Analyze Text</button>
                </div>
            </div>

            <div class="results-section">
                <div class="summary-cards">
                    <div class="card">
                        <div class="card-icon"><i class="fas fa-font"></i></div>
                        <div class="card-content">
                            <h3>Characters</h3>
                            <p id="char-count">0</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fas fa-keyboard"></i></div>
                        <div class="card-content">
                            <h3>Words</h3>
                            <p id="word-count">0</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fas fa-align-left"></i></div>
                        <div class="card-content">
                            <h3>Lines</h3>
                            <p id="line-count">0</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-icon"><i class="fas fa-stopwatch"></i></div>
                        <div class="card-content">
                            <h3>Reading Time</h3>
                            <p id="reading-time">0 min</p>
                        </div>
                    </div>
                </div>

                <div class="advanced-stats">
                    <h2><i class="fas fa-chart-pie"></i> Advanced Statistics</h2>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span>Character (no spaces)</span>
                            <span id="char-no-spaces">0</span>
                        </div>
                        <div class="stat-item">
                            <span>Unique Words</span>
                            <span id="unique-words">0</span>
                        </div>
                        <div class="stat-item">
                            <span>Avg. Word Length</span>
                            <span id="avg-word-length">0</span>
                        </div>
                        <div class="stat-item">
                            <span>Longest Word</span>
                            <span id="longest-word">-</span>
                        </div>
                    </div>
                </div>

                <div class="word-frequency">
                    <h2><i class="fas fa-list-ol"></i> Word Frequency</h2>
                    <div class="frequency-controls">
                        <div>
                            <label for="min-length">Min word length:</label>
                            <input type="number" id="min-length" min="1" value="3">
                        </div>
                        <div>
                            <label for="min-frequency">Min frequency:</label>
                            <input type="number" id="min-frequency" min="1" value="2">
                        </div>
                        <button id="update-frequency"><i class="fas fa-sync-alt"></i> Update</button>
                    </div>
                    <div class="frequency-table-container">
                        <table id="frequency-table">
                            <thead>
                                <tr>
                                    <th>Word</th>
                                    <th>Count</th>
                                    <th>Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Filled by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <p>Text File Word Counter &copy; <?php echo date('Y'); ?></p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>