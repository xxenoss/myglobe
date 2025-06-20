export default function Footer() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <h3>ReliveTravels</h3>
      <p>Relive your adventures. Anytime. Anywhere.</p>
    </div>

    <div class="footer-links">
      <a href="#features">Features</a>
      <a href="#testimonials">Testimonials</a>
      <a href="#download">Download</a>
      <a href="#contact">Contact</a>
    </div>

    <div class="footer-social">
      <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" /></a>
      <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" alt="Twitter" /></a>
      <a href="#"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="Facebook" /></a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 ReliveTravels. All rights reserved.</p>
  </div>
</footer>` } } />
  );
}