export default function ThemeScript() {
  const code = `(function() {
    try {
      var stored = localStorage.getItem('theme');
      var now = new Date();
      var hour = now.getHours();
      var theme = stored || ((hour >= 7 && hour < 19) ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
