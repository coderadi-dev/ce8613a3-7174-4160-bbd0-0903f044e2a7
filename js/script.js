const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry);
			}
		});
	},
	{
		threshold: 0.18,
		rootMargin: "0px 0px -8% 0px"
	}
);

document.querySelectorAll(".fade-section").forEach((section) => {
	observer.observe(section);
});
