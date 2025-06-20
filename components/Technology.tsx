export default function Technology() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="technology" id="technology">
  <div class="tech-container">
    <div class="tech-left" data-aos="fade-right">
      <img src="/images/swim.jpg" alt="Technology Illustration" />
    </div>
    <div class="tech-right" data-aos="fade-left">
      <h2>Interactive Technology</h2>
      <p>
        Our platform combines real-time tracking, 3D maps, and advanced syncing tools to help you capture and relive your journeys.
      </p>
      <ul>
        <li>Real-time GPS Mapping</li>
        <li>Interactive Globe Views</li>
        <li>Cross-device Synchronization</li>
        <li>Privacy-first Location Sharing</li>
      </ul>
    </div>
  </div>
</section>` } } />
  );
}