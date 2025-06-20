export default function Howitworks() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="how-it-works" id="features">
  <div class="hiw-container">
    <h2 data-aos="fade-up">How It Works</h2>

    <div class="hiw-grid">
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="100">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/marker.png" alt="Track" />
        <h3>Track</h3>
        <p>Record your routes and locations in real time.</p>
      </div>
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="200">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/worldwide-location.png" alt="Map" />
        <h3>Map</h3>
        <p>Visualize every journey on an interactive map.</p>
      </div>
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="300">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/share.png" alt="Share" />
        <h3>Share</h3>
        <p>Show your stories with friends and explorers.</p>
      </div>
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="400">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/adventure.png" alt="Explore" />
        <h3>Explore</h3>
        <p>Discover curated paths and global experiences.</p>
      </div>
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="500">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/synchronize.png" alt="Sync" />
        <h3>Sync</h3>
        <p>Keep all your devices and memories in sync.</p>
      </div>
      <div class="hiw-card" data-aos="fade-up" data-aos-delay="600">
        <img src="https://img.icons8.com/ios-filled/100/00bfa5/replay.png" alt="Replay" />
        <h3>Replay</h3>
        <p>Relive your adventures anytime, anywhere.</p>
      </div>
    </div>
  </div>
</section>` } } />
  );
}