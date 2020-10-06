export default {
    bind(el, binding) {
        const animationClass = binding.value ? binding.value : 'fadeIn';

        el.classList.add(`${animationClass}-before-enter`);
        
        if ('IntersectionObserver' in window) {

            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(`${animationClass}-enter`);
                            observer.unobserve(entry.target);
                        }
                    });
                }
            );

            observer.observe(el);
        } else {
            el.classList.add(`${animationClass}-enter`);
        }
    }
};