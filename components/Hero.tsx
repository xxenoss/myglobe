export default function Hero() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="hero-section">
  <div class="hero-bg">
    <div class="hero-content">
      <div class="hero-left" data-aos="fade-right">
        <div class="globe-spinner"></div>
      </div>
      <div class="hero-right" data-aos="fade-left">
        <h1>Relive Your Adventures</h1>
        <p>Track, map, and share your travel stories with the world.</p>
        <a href="#features" class="cta-button">Get Started</a>
      </div>
    </div>
  </div>
</section>` } } />
  );
}