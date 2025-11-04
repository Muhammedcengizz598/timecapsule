// Create Modal
const createModal = document.getElementById('createModal');

function showCreateModal() {
    createModal.classList.add('active');
    setMinDateTime();
}

function closeCreateModal() {
    createModal.classList.remove('active');
}

function setMinDateTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const input = document.getElementById('open-date');
    if (input) {
        input.min = now.toISOString().slice(0, 16);
    }
}

// File upload handlers
document.getElementById('audio-upload')?.addEventListener('change', function() {
    document.getElementById('audio-name').textContent = this.files[0]?.name || '';
});

document.getElementById('image-upload')?.addEventListener('change', function() {
    document.getElementById('image-name').textContent = this.files[0]?.name || '';
});

document.getElementById('video-upload')?.addEventListener('change', function() {
    document.getElementById('video-name').textContent = this.files[0]?.name || '';
});

// Handle Create Capsule
async function handleCreateCapsule(e) {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    const openDate = document.getElementById('open-date').value;
    
    const formData = new FormData();
    formData.append('message', message);
    formData.append('open_date', openDate);
    formData.append('notification_token', localStorage.getItem('notificationToken') || '');
    
    const audioFile = document.getElementById('audio-upload').files[0];
    const imageFile = document.getElementById('image-upload').files[0];
    const videoFile = document.getElementById('video-upload').files[0];
    
    if (audioFile) formData.append('audio', audioFile);
    if (imageFile) formData.append('image', imageFile);
    if (videoFile) formData.append('video', videoFile);
    
    try {
        const response = await fetch('/create-capsule/', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            scheduleNotification(new Date(data.open_date), data.capsule_id);
            closeCreateModal();
            location.reload();
        } else {
            alert('Failed to create capsule. Please try again.');
        }
    } catch (error) {
        console.error('Capsule creation error:', error);
        alert('An error occurred. Please try again.');
    }
}

// Delete Capsule
async function deleteCapsule(capsuleId) {
    if (!confirm('Are you sure you want to delete this time capsule? This action cannot be undone.')) {
        return;
    }
    
    const card = document.querySelector(`[data-capsule-id="${capsuleId}"]`);
    
    // Add loading state
    if (card) {
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
    }
    
    try {
        const response = await fetch(`/delete-capsule/${capsuleId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Animate removal
            if (card) {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.remove();
                    
                    // Check if there are no more capsules
                    if (document.querySelectorAll('.capsule-card').length === 0) {
                        location.reload();
                    }
                }, 300);
            }
            
            // Remove from localStorage
            const capsules = JSON.parse(localStorage.getItem('scheduledCapsules') || '[]');
            const updatedCapsules = capsules.filter(c => c.id !== capsuleId);
            localStorage.setItem('scheduledCapsules', JSON.stringify(updatedCapsules));
            
        } else {
            alert(data.error || 'Failed to delete capsule.');
            if (card) {
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            }
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred. Please try again.');
        if (card) {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        }
    }
}

// Update countdowns
function updateCountdowns() {
    const countdowns = document.querySelectorAll('.capsule-countdown');
    
    countdowns.forEach(countdown => {
        const openDate = new Date(countdown.dataset.openDate);
        const now = new Date();
        const distance = openDate.getTime() - now.getTime();
        
        if (distance < 0) {
            countdown.querySelector('.countdown-text').textContent = 'Ready to Open!';
            countdown.style.background = 'rgba(0, 255, 65, 0.2)';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        let text = '';
        if (days > 0) text += `${days}d `;
        text += `${hours}h ${minutes}m ${seconds}s`;
        
        countdown.querySelector('.countdown-text').textContent = text;
    });
}

// Schedule notification
function scheduleNotification(targetDate, capsuleId) {
    const now = new Date().getTime();
    const timeUntil = targetDate.getTime() - now;
    
    if (timeUntil > 0) {
        const capsules = JSON.parse(localStorage.getItem('scheduledCapsules') || '[]');
        capsules.push({
            id: capsuleId,
            date: targetDate.toISOString(),
            scheduled: true
        });
        localStorage.setItem('scheduledCapsules', JSON.stringify(capsules));
        
        if (timeUntil < 2147483647) {
            setTimeout(() => {
                showNotification(capsuleId);
            }, timeUntil);
        }
    }
}

// Show notification
function showNotification(capsuleId) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('Time Capsule Opened!', {
            body: 'Your time capsule is ready to be opened. Click to view your message from the past.',
            icon: '/static/images/icon.png',
            badge: '/static/images/badge.png',
            tag: `capsule-${capsuleId}`,
            requireInteraction: true,
            vibrate: [200, 100, 200]
        });
        
        notification.onclick = function() {
            window.focus();
            window.location.href = '/dashboard/';
            this.close();
        };
    }
}

// Check for scheduled notifications
function checkScheduledNotifications() {
    const capsules = JSON.parse(localStorage.getItem('scheduledCapsules') || '[]');
    const now = new Date();
    
    capsules.forEach((capsule, index) => {
        const targetDate = new Date(capsule.date);
        
        if (targetDate <= now && capsule.scheduled) {
            showNotification(capsule.id);
            capsules[index].scheduled = false;
        } else if (targetDate > now) {
            const timeUntil = targetDate.getTime() - now.getTime();
            if (timeUntil < 2147483647) {
                setTimeout(() => {
                    showNotification(capsule.id);
                }, timeUntil);
            }
        }
    });
    
    localStorage.setItem('scheduledCapsules', JSON.stringify(capsules));
}

// Initialize
if (document.querySelectorAll('.capsule-countdown').length > 0) {
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

checkScheduledNotifications();

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === createModal) {
        closeCreateModal();
    }
});

// Make functions global
window.showCreateModal = showCreateModal;
window.closeCreateModal = closeCreateModal;
window.handleCreateCapsule = handleCreateCapsule;
window.deleteCapsule = deleteCapsule;
