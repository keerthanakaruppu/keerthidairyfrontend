
  // js/authGuard.js
(async () => {
    try {
      const response = await fetch('https://keerthidairybackend.onrender.com/check-auth', {
        method: 'GET',
        credentials: 'include', // important: sends cookie
      });
  
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
  
      const data = await response.json();
      if (!data.success) {
        throw new Error('Invalid session');
      }
    } catch (err) {
      // Redirect if not authenticated
      window.location.href = 'index.html';
    }
  })();
  
  