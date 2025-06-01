import { useState, useEffect, useRef } from 'react';
import './statistics.scss';

function useInView(options) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            options
        );

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [options]);

    return [ref, inView];
}

const countersData = [
    { label: 'Ընդհանուր շրջանավարտներ', end: 450, suffix: '' },
    { label: 'Վանաձորում շրջանավարտներ', end: 148, suffix: '' },
    { label: 'Աշխատող շրջանավարտներ', end: 97, suffix: '%' },
    { label: 'Անկախ գործունեություն սկսած շրջանավարտներ', end: 30, suffix: '%' },
    { label: 'Աշխատող դիմորդներ', end: 65, suffix: '%' },
];

function Statistics() {
    const [counts, setCounts] = useState(countersData.map(() => 0));
    const [ref, inView] = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const frameDuration = 50;
        const totalFrames = Math.round(duration / frameDuration);
        const increments = countersData.map(counter => counter.end / totalFrames);

        let frame = 0;
        const counterInterval = setInterval(() => {
            frame++;
            setCounts(prevCounts =>
                prevCounts.map((count, i) => {
                    const newCount = count + increments[i];
                    return newCount >= countersData[i].end ? countersData[i].end : newCount;
                })
            );
            if (frame === totalFrames) {
                clearInterval(counterInterval);
            }
        }, frameDuration);

        return () => clearInterval(counterInterval);
    }, [inView]);

    return (
        <div id='statistics' ref={ref}>
            <h2>«ԱՌԴԱ» ԲՀ Մասնագիտական Կենտրոնի Վիճակագրություն</h2>
            <ul>
                {countersData.map((counter, index) => (
                    <li key={index}>
                        <div className="count">{Math.round(counts[index])}{counter.suffix}</div>
                        <div className="label">{counter.label}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Statistics;
