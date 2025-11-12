// Minimal 404 page that doesn't use React hooks to avoid SSR issues
function Custom404() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p><a href="/">Go back home</a></p>
    </div>
  );
}

Custom404.displayName = 'Custom404';
export default Custom404;

