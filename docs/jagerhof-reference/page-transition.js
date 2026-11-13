// page load
let tl = gsap.timeline();
tl.fromTo(".transition_wrap", {
  clipPath: "inset(0% 0% 0% 0%)"
}, {
  clipPath: "inset(0% 0% 100% 0%)",
  duration: 0.75,
  delay: 0.5,
  ease: "power2.out"
})
tl.to(".transition_logo", {
  autoAlpha: 0,
  duration: 0.4,
  ease: "power2.out"
}, "<")
tl.set(".transition_wrap", { display: "none" })

// link click
$("a:not(.excluded-class)").on("click", function (e) {
  let currentUrl = $(this).attr("href");
  if ($(this).prop("hostname") === window.location.host && !currentUrl.includes("#") && $(this)
    .attr("target") !== "_blank") {
    e.preventDefault();
    // lenis.stop();
    let tl = gsap.timeline({ onComplete: () => (window.location.href = currentUrl) });
    tl.set(".transition_wrap", { display: "flex" })
    tl.fromTo(".transition_wrap", {
      clipPath: "inset(100% 0% 0% 0%)",
    }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.75,
      ease: "power2.out"
    })
    tl.fromTo(".transition_logo", {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "<+25%")
  }
});
// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) window.location.reload();
};
