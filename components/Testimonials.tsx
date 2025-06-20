export default function Testimonials() {
  return (
    <section dangerouslySetInnerHTML={ { __html: `<section class="testimonials" id="testimonials">
  <div class="testimonials-container">
    <h2>What Our Travelers Say</h2>

    <div class="testimonial-slider swiper">
      <div class="swiper-wrapper">

        <!-- Slide 1 -->
        <div class="swiper-slide">
          <div class="testimonial-card">
            <p>"This app made my Iceland trip unforgettable. The route tracking and journal are amazing!"</p>
            <h4>- Anna, Germany</h4>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="swiper-slide">
          <div class="testimonial-card">
            <p>"I loved how I could share my journey live with my family while biking across Italy."</p>
            <h4>- Luca, Italy</h4>
          </div>
        </div>

        <!-- Slide 3 -->
        <div class="swiper-slide">
          <div class="testimonial-card">
            <p>"Super simple to use and works offline. A must-have for any solo traveler!"</p>
            <h4>- Mei, Japan</h4>
          </div>
        </div>

      </div>

      <!-- Swiper Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>` } } />
  );
}