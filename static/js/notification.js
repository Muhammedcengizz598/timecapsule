let notificationToken = null;

// Enable notifications
document.getElementById('enable-notifications').addEventListener('click', async () => {
    const statusDiv = document.getElementById('notification-status');
    
    if (!('Notification' in window)) {
        statusDiv.textContent = 'Your browser does not support notifications.';
        statusDiv.className = 'notification-status error';
        return;
    }
    
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
            statusDiv.textContent = 'Notifications enabled successfully!';
            statusDiv.className = 'notification-status success';
            
            await registerServiceWorker();
            
            setTimeout(() => {
                window.location.href = '/dashboard/';
            }, 1500);
        } else {
            statusDiv.textContent = 'Notification permission denied. You can still use the app, but you won\'t receive notifications.';
            statusDiv.className = 'notification-status error';
            
            setTimeout(() => {
                window.location.href = '/dashboard/';
            }, 3000);
        }
    } catch (error) {
        console.error('Notification permission error:', error);
        statusDiv.textContent = 'An error occurred. Please try again.';
        statusDiv.className = 'notification-status error';
    }
});

// Skip notifications
document.getElementById('skip-notifications').addEventListener('click', () => {
    window.location.href = '/dashboard/';
});

// Service Worker Registration
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/static/js/sw.js');
            console.log('Service Worker registered:', registration);
            
            if ('PushManager' in window) {
                try {
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBPa-aXt4VmjVzr4GtEr39qyqKJlJiZgGKmXL8zvKRH9nJ8W0U1XhjqrPpGdPOVU')
                    });
                    
                    notificationToken = JSON.stringify(subscription);
                    
                    await fetch('/save-token/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: notificationToken })
                    });
                } catch (subError) {
                    console.log('Push subscription failed:', subError);
                }
            }
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
