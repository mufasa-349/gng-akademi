"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { featuredVideo as v } from "@/lib/data";

/** Hafif YouTube gömme: önce kapak görseli, tıklayınca iframe yüklenir. */
export function VideoFeature() {
  const [play, setPlay] = useState(false);
  return (
    <div className="vid">
      <div className="vid-frame clip-reveal">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="vid-cover" onClick={() => setPlay(true)} aria-label={`${v.title} videosunu oynat`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(v.thumb)} alt="" loading="lazy" />
            <span className="vid-play">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span className="vid-tag">Soru 38 · Mutlak Değer</span>
          </button>
        )}
      </div>
    </div>
  );
}
