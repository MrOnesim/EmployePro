export async function subscribeToPush() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'denied') return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const reg = await navigator.serviceWorker.ready;
  if (!reg.pushManager) return;

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    const key = urlBase64ToUint8Array(
      import.meta.env.VITE_VAPID_PUBLIC_KEY || 'BEl62iZR8wRg9P0p8o0q8wRg9P0p8o0q8wRg9P0p8o0q8wRg9P0p8o0q8'
    );
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: key,
    });
  }
  return sub;
}

function urlBase64ToUint8Array(base64: string) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from(raw.split('').map(c => c.charCodeAt(0)));
}
