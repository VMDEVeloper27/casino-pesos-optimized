export default function TestPage() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Test Page - No Auth Required</h1>
      <p>If you can see this, the site is working.</p>
      <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'Server Side'}</p>
    </div>
  );
}