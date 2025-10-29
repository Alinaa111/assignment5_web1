// Task 8: Info Icon with Expandable Warning Text and Copy
document.addEventListener('DOMContentLoaded', function() {
    const shareNotice = document.querySelector('.share-notice');
    const infoIcon = shareNotice.querySelector('.info-icon');
    
    if (shareNotice && infoIcon) {
        // Create expandable warning section
        const warningSection = document.createElement('div');
        warningSection.className = 'warning-section';
        warningSection.innerHTML = `
            <div class="warning-text-content">
                <h4>⚠️ Why you shouldn't share your membership:</h4>
                <ul>
                    <li>Your account may be suspended permanently</li>
                    <li>You'll lose all accumulated bonus days</li>
                    <li>Access will be revoked immediately without notice</li>
                    <li>No refunds will be issued under any circumstances</li>
                    <li>Legal action may be taken for Terms of Service violation</li>
                </ul>
                <p class="warning-footer">Sharing membership credentials is a violation of our Terms of Service.</p>
            </div>
            <button class="copy-warning-btn">
                <span class="copy-icon">📋</span>
                <span class="copy-text">Copy Warning</span>
            </button>
        `;
        
        // Insert warning section after share-notice
        shareNotice.parentNode.insertBefore(warningSection, shareNotice.nextSibling);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = 'Copied to clipboard!';
        document.body.appendChild(tooltip);
        
        // Toggle warning section visibility
        infoIcon.addEventListener('click', function(e) {
            e.preventDefault();
            warningSection.classList.toggle('show');
            infoIcon.classList.toggle('active');
        });
        
        // Copy button functionality
        const copyBtn = warningSection.querySelector('.copy-warning-btn');
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get all warning text
            const warningContent = warningSection.querySelector('.warning-text-content');
            const textToCopy = warningContent.innerText;
            
            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopiedFeedback();
                }).catch(err => {
                    fallbackCopyText(textToCopy);
                });
            } else {
                fallbackCopyText(textToCopy);
            }
        });
        
        // Show copied feedback
        function showCopiedFeedback() {
            const copyIcon = copyBtn.querySelector('.copy-icon');
            const copyText = copyBtn.querySelector('.copy-text');
            
            // Change button to success state
            copyIcon.textContent = '✅';
            copyText.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            // Position and show tooltip
            const rect = copyBtn.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.classList.add('show');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyIcon.textContent = '📋';
                copyText.textContent = 'Copy Warning';
                copyBtn.classList.remove('copied');
                tooltip.classList.remove('show');
            }, 2000);
        }
        
        // Fallback copy method
        function fallbackCopyText(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopiedFeedback();
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            
            document.body.removeChild(textArea);
        }
    }
});