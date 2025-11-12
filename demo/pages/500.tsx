// Minimal 500 page that doesn't use React hooks to avoid SSR issues
function Custom500() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>500 - Server Error</h1>
      <p><a href="/">Go back home</a></p>
    </div>
  );
}

Custom500.displayName = 'Custom500';
export default Custom500;

