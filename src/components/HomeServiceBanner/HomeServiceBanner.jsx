import React, { useEffect } from "react";
import "./HomeServiceBanner.scss";
import Link from "next/link";
import { tenant } from "@/lib/config";

function HomeServiceBanner() {
    useEffect(() => {
        document.documentElement.style.setProperty('--cta-background', `url(/assets/${tenant.shortName}/home/home-cta-1-bg.webp)`);
    }, []);

    return (
        <div className="service-banner">
            <div className="service-banner__content">
                <h2 className="heading-quaternary">
                    We give knowledge to {tenant.shortName} patients, families, and caregivers{" "}
                </h2>
                <p className="body-large color-light-grey w-300">
                    Collection of simplified {tenant.shortName} articles certified by experts.{" "}
                    <span className="w-600 ">Powered by REiNS.</span>
                </p>
            </div>
            <Link href="/articles" className="btn btn-primary-white">
                Explore All
            </Link>
        </div>
    );
}

export default HomeServiceBanner;
