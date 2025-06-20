export default function Features() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="features" id="features">
  <div class="features-container">
    <h2 data-aos="fade-up">Why Choose Us?</h2>
    <div class="features-grid">
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="100">
        <h3>Plan Trips Easily</h3>
        <p>Use intuitive tools to organize, bookmark, and plan every destination.</p>
      </div>
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="200">
        <h3>Access Anywhere</h3>
        <p>Your travel history and plans sync across devices automatically.</p>
      </div>
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="300">
        <h3>Privacy Controls</h3>
        <p>You're in control of what you share and who sees it.</p>
      </div>
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="400">
        <h3>Cloud Sync</h3>
        <p>Data is securely backed up and accessible even on the go.</p>
      </div>
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="500">
        <h3>Offline Support</h3>
        <p>Use maps and log trips even without a data connection.</p>
      </div>
      <div class="feature-card" data-aos="zoom-in" data-aos-delay="600">
        <h3>Live Sharing</h3>
        <p>Broadcast your journey in real-time with close friends.</p>
      </div>
    </div>
  </div>
</section>` } } />
  );
}