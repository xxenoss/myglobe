export default function Download() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="download-app" id="download">
  <div class="download-container">
    <div class="download-text" data-aos="fade-right">
      <h2>Take Your Adventures Anywhere</h2>
      <p>Download the TravelTrack app and relive every journey on the go. Offline support, real-time syncing, and immersive features await.</p>
      <div class="download-buttons">
        <a href="#" class="btn app-store">
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg" alt="App Store" width="24" height="24" style="filter: invert(1);" />
  <span>App Store</span>
</a>

        <a href="#" class="btn google-play">
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googleplay.svg" alt="Google Play" width="24" height="24" style="filter: invert(1);" />
  <span>Google Play</span>
</a>
      </div>
    </div>

    <div class="download-image" data-aos="fade-left">
      <img src="https://img.icons8.com/ios/300/00bfa5/smartphone-tablet.png" alt="App Preview" />
    </div>
  </div>
</section>` } } />
  );
}