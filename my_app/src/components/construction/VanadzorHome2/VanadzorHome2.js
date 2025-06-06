import React from "react";
import "./vanadzorHome2.scss";

const VanadzorHome2 = () => {
    return (
        <section className="vanadzor-home">
            <div className="container">
                <div className="text-block">
                    <h1>Վանաձոր տուն (2 հարկ)</h1>
                    <p>
                        «Home of Hope» նախագիծը Վանաձորում նախատեսում է երկու հարկանի, երեք
                        սենյականոց բնակելի տներ՝ նախատեսված ժամանակակից, խելացի և էներգաարդյունավետ ընտանիքների համար։
                    </p>
                    <ul>
                        <li>🛏 3 ննջասենյակ</li>
                        <li>🛁 Լոգասենյակ և մուտքի նախասրահ</li>
                        <li>🍽 Խոհանոցային և հյուրասենյակային բաց տարածք</li>
                        <li>🌞 Արևային ջրատաքացուցիչներ և ֆոտովոլտային վահանակներ</li>
                    </ul>
                </div>
                <div className="image-block">
                    <img src="/images/home1.jpeg" alt="Vanadzor House" />
                </div>
            </div>
        </section>
    );
};

export default VanadzorHome2;
