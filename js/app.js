/* ================================================================
   CHINA TRAVEL DASHBOARD
   APPLICATION JAVASCRIPT

   This file controls the interface.

   DO NOT put itinerary content here.

   It reads TRAVEL_DATA from travel-data.js.
   ================================================================ */


/* ================================================================
   1. APPLICATION STATE
   ================================================================ */

let currentCity = "shanghai";

let currentLocation = null;


/* ================================================================
   2. HTML ESCAPE HELPER
   ================================================================ */

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ================================================================
   3. CITY NAVIGATION
   ================================================================ */

function renderCityNavigation() {

    const cityNav =
        document.querySelector(".city-nav");


    if (!cityNav) {

        return;

    }


    cityNav.innerHTML = "";


    Object.entries(TRAVEL_DATA)
        .forEach(
            ([cityId, city]) => {


                const button =
                    document.createElement("button");


                button.type =
                    "button";


                button.className =
                    "city-button";


                button.dataset.city =
                    cityId;


                if (
                    cityId === currentCity
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                button.innerHTML = `

                    <span class="city-icon">

                        ${city.icon}

                    </span>


                    <span class="city-info">

                        <span class="city-name">

                            ${escapeHTML(
                                city.name
                            )}

                        </span>


                        <span class="city-cn">

                            ${escapeHTML(
                                city.chineseName
                            )}

                        </span>

                    </span>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        switchCity(cityId);

                    }
                );


                cityNav.appendChild(
                    button
                );

            }
        );

}


/* ================================================================
   4. RENDER CITY
   ================================================================ */

function renderCity(cityId) {

    const city =
        TRAVEL_DATA[cityId];


    if (!city) {

        console.error(
            "City not found:",
            cityId
        );

        return;

    }


    currentCity =
        cityId;


    currentLocation =
        city.locations[0]?.id || null;


    const container =
        document.getElementById(
            "city-content"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /*
     * Location tabs
     */

    const tabsWrapper =
        document.createElement(
            "div"
        );


    tabsWrapper.className =
        "location-tabs-wrapper";


    const tabs =
        document.createElement(
            "div"
        );


    tabs.className =
        "location-tabs";


    city.locations.forEach(
        (location, index) => {


            const tab =
                document.createElement(
                    "button"
                );


            tab.type =
                "button";


            tab.className =
                "location-tab";


            tab.dataset.location =
                location.id;


            tab.textContent =
                location.name;


            if (index === 0) {

                tab.classList.add(
                    "active"
                );

            }


            tab.addEventListener(
                "click",
                () => {

                    switchLocation(
                        location.id
                    );

                }
            );


            tabs.appendChild(tab);

        }
    );


    tabsWrapper.appendChild(
        tabs
    );


    container.appendChild(
        tabsWrapper
    );


    /*
     * Location panels
     */

    city.locations.forEach(
        (location, index) => {

            const panel =
                createLocationPanel(
                    location,
                    index === 0
                );


            container.appendChild(
                panel
            );

        }
    );


    /*
     * Process embeds after DOM
     * has been created.
     */

    setTimeout(
        refreshSocialEmbeds,
        100
    );

}


/* ================================================================
   5. CREATE LOCATION PANEL
   ================================================================ */

function createLocationPanel(
    location,
    active
) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "location-panel";


    article.dataset.locationPanel =
        location.id;


    if (active) {

        article.classList.add(
            "active"
        );

    }


    article.innerHTML = `

        <div class="location-heading">


            <div class="location-title-wrap">

                <h2 class="location-title">

                    ${escapeHTML(
                        location.name
                    )}

                    ${
                        location.chineseName
                        ?
                        `<span>
                            ${escapeHTML(
                                location.chineseName
                            )}
                        </span>`
                        :
                        ""
                    }

                </h2>


                <p class="location-description">

                    ${escapeHTML(
                        location.description
                    )}

                </p>

            </div>


            ${
                location.map
                ?
                `

                    <a
                        href="${escapeHTML(
                            location.map
                        )}"

                        target="_blank"

                        rel="noopener noreferrer"

                        class="map-link"
                    >

                        📍 Google Maps

                    </a>

                `
                :
                ""
            }


        </div>


        <div class="media-section-label">

            Social Media

        </div>


        <div class="media-workspace">


            <div>

                <div class="social-grid">

                    ${renderSocialMedia(
                        location.social || []
                    )}

                </div>

            </div>


            <div>

                <div class="media-section-label">

                    Our Photos

                </div>


                <div class="photo-gallery">

                    ${renderPhotos(
                        location.photos || []
                    )}

                </div>

            </div>


        </div>

    `;


    return article;

}


/* ================================================================
   6. SOCIAL MEDIA
   ================================================================ */

function renderSocialMedia(
    socialItems
) {

    const items = [
        ...socialItems
    ];


    /*
     * Always provide four media positions.
     */

    while (
        items.length < 4
    ) {

        items.push({
            platform: "video",
            embed: null
        });

    }


    return items
        .slice(0, 4)
        .map(
            (item, index) =>
                createSocialCard(
                    item,
                    index
                )
        )
        .join("");

}


/* ================================================================
   7. SOCIAL MEDIA CARD
   ================================================================ */

/* ================================================================
   SOCIAL MEDIA CARD GENERATOR

   IMPORTANT:

   travel-data.js only needs the URL.

   Example:

   {
       platform: "tiktok",
       url: "https://www.tiktok.com/@user/video/123456789"
   }

   app.js converts that URL into the appropriate embed.
   ================================================================ */

function createSocialCard(item, index) 
{
    const platform =
        (
            item.platform ||
            "video"
        ).toLowerCase();

    /* ============================================================
       REDNOTE
       ============================================================ */
    if (platform === "rednote") 
    {
        return createRednoteCard(
            item
        );

    }

    /* ============================================================
       INSTAGRAM
       ============================================================ */
    if (platform === "instagram") 
    {
        return createInstagramCard(
            item,
            index
        );
    }

    /* ============================================================
       TIKTOK
       ============================================================ */
    if (platform === "tiktok") 
    {
        return createTikTokCard(
            item,
            index
        );
    }

    /* ============================================================
       EMPTY / UNKNOWN MEDIA
       ============================================================ */
    return createEmptyMediaCard();
}

/* ================================================================
   INSTAGRAM CARD
   ================================================================ */

function createInstagramCard(item, index) 
{
    const url =
        item.url || "";
    /*
     * No URL supplied.
     */

    if (!url) {
        return `

            <div class="media-card">

                <span class="platform-badge">
                    Instagram
                </span>

                <div class="embed-slot">

                    <div class="media-placeholder">

                        <div class="media-placeholder-icon">
                            ◎
                        </div>

                        <strong>
                            Instagram
                        </strong>

                        <small>
                            Add the Instagram URL
                            in travel-data.js
                        </small>

                    </div>

                </div>

            </div>

        `;

    }


    /*
     * Instagram's official embed system
     * uses a blockquote containing the
     * original post URL.
     */

    return `

        <div class="media-card">

            <span class="platform-badge">
                Instagram
            </span>

            <div class="embed-slot">

                <blockquote

                    class="instagram-media"

                    data-instgrm-permalink="${escapeHTML(
                        url
                    )}"

                    data-instgrm-version="14"

                    style="
                        background:#fff;
                        border:0;
                        margin:0;
                        padding:0;
                        width:100%;
                    "

                ></blockquote>

            </div>

        </div>

    `;

}

/* ================================================================
   TIKTOK CARD
   ================================================================ */
function createTikTokCard(item, index) 
{
    const url =
        item.url || "";
    /*
     * No URL supplied.
     */
    if (!url) {
        return `

            <div class="media-card">

                <span class="platform-badge">
                    TikTok
                </span>

                <div class="embed-slot">

                    <div class="media-placeholder">

                        <div class="media-placeholder-icon">
                            ♪
                        </div>

                        <strong>
                            TikTok
                        </strong>

                        <small>
                            Add the TikTok URL
                            in travel-data.js
                        </small>

                    </div>

                </div>

            </div>

        `;

    }


    /*
     * Extract TikTok video ID.
     */

    const videoId =
        extractTikTokVideoId(
            url
        );


    /*
     * If we can't determine the ID,
     * show the URL instead of creating
     * a broken player.
     */

    if (!videoId) {

        return `

            <div class="media-card">

                <span class="platform-badge">
                    TikTok
                </span>

                <div class="embed-slot">

                    <div class="media-placeholder">

                        <div class="media-placeholder-icon">
                            ♪
                        </div>

                        <strong>
                            TikTok
                        </strong>

                        <small>
                            Unable to identify the
                            TikTok video ID.
                        </small>

                        <a
                            href="${escapeHTML(url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rednote-button"
                            style="margin-top:12px;"
                        >
                            Open TikTok ↗
                        </a>

                    </div>

                </div>

            </div>

        `;

    }


    /*
     * TikTok's official player.
     *
     * This avoids needing to paste a huge
     * TikTok blockquote into our data file.
     */

    const playerUrl =
        `https://www.tiktok.com/player/v1/${videoId}`;


    return `

        <div class="media-card">

            <span class="platform-badge">
                TikTok
            </span>

            <div class="embed-slot">

                <iframe

                    src="${playerUrl}"

                    title="TikTok video"

                    loading="lazy"

                    allow="
                        autoplay;
                        encrypted-media;
                        picture-in-picture;
                    "

                    allowfullscreen

                    style="
                        width:100%;
                        height:100%;
                        border:0;
                    "

                ></iframe>

            </div>

        </div>

    `;

}

/* ================================================================
   EXTRACT TIKTOK VIDEO ID
   ================================================================ */

function extractTikTokVideoId(url) 
{
    if (!url) {
        return null;
    }
    /*
     * Standard TikTok URL:
     *
     * https://www.tiktok.com/@username/video/123456789
     */
    const standardMatch =
        url.match(
            /\/video\/(\d+)/
        );

    if (
        standardMatch &&
        standardMatch[1]
    ) {
        return standardMatch[1];
    }
    /*
     * TikTok short/share URLs are more
     * difficult because they redirect.
     *
     * We intentionally don't guess the ID.
     */
    return null;
}

/* ================================================================
   REDNOTE CARD
   ================================================================ */

function createRednoteCard(item) 
{
    const url =
        item.url ||
        "https://www.xiaohongshu.com/";

    const thumbnail =
        item.thumbnail ||
        "";

    return `
        <div class="media-card">
            <span class="platform-badge">
                Rednote
            </span>
            <div class="rednote-card">
                ${
                    thumbnail
                    ?
                    `
                    <img
                        class="rednote-thumbnail"
                        src="${escapeHTML(
                            thumbnail
                        )}"
                        alt="Rednote preview"
                        loading="lazy"
                    >
                    `
                    :
                    `
                    <div class="rednote-fallback">
                        📕
                    </div>
                    `
                }
                <div class="rednote-overlay"></div>
                <div class="rednote-content">
                    <div class="rednote-label">
                        Xiaohongshu
                    </div>
                    <h4>
                        Rednote
                    </h4>
                    <p>
                        Open the original
                        post on Rednote.
                    </p>
                    <a
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="rednote-button"
                    >
                        Click to view on Rednote ↗
                    </a>
                </div>
            </div>
        </div>
    `;
}

/* ================================================================
   EMPTY MEDIA CARD
   ================================================================ */

function createEmptyMediaCard() {
    return `
        <div class="media-card">
            <span class="platform-badge">
                Add Media
            </span>
            <div class="embed-slot">
                <div class="media-placeholder">
                    <div class="media-placeholder-icon">
                        +
                    </div>
                    <strong>
                        Add video
                    </strong>
                    <small>
                        Add a TikTok,
                        Instagram or
                        Rednote post.
                    </small>
                </div>
            </div>
        </div>
    `;
}

/* ================================================================
   8. PHOTO GALLERY
   ================================================================ */

function renderPhotos(
    photos
) {

    if (
        !photos.length
    ) {

        return `

            <div
                class="photo-card large"
            >

                <div
                    class="media-placeholder"
                    style="
                        position:absolute;
                        inset:0;
                    "
                >

                    <div
                        class="media-placeholder-icon"
                    >
                        📸
                    </div>


                    <strong>

                        Add our photos

                    </strong>


                    <small>

                        Add personal photos
                        to travel-data.js

                    </small>

                </div>

            </div>

        `;

    }


    return photos
        .map(
            (photo, index) => {


                const size =
                    index === 0
                    ? "large"
                    : "";


                return `

                    <div
                        class="photo-card ${size}"
                    >


                        <img

                            src="${escapeHTML(
                                photo.src
                            )}"

                            alt="${escapeHTML(
                                photo.alt ||
                                "Travel photo"
                            )}"

                            loading="lazy"

                        >


                        <div class="photo-overlay">

                            <span>

                                ${escapeHTML(
                                    photo.alt ||
                                    "Travel photo"
                                )}

                            </span>

                        </div>


                    </div>

                `;

            }
        )
        .join("");

}


/* ================================================================
   9. SWITCH CITY
   ================================================================ */

function switchCity(
    cityId
) {

    if (
        !TRAVEL_DATA[cityId]
    ) {

        return;

    }


    currentCity =
        cityId;


    /*
     * Update navigation.
     */

    document
        .querySelectorAll(
            ".city-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.city ===
                    cityId
                );

            }
        );


    /*
     * Render selected city.
     */

    renderCity(
        cityId
    );


    /*
     * Scroll to beginning.
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================================================================
   10. SWITCH LOCATION
   ================================================================ */

function switchLocation(
    locationId
) {

    currentLocation =
        locationId;


    /*
     * Update tabs.
     */

    document
        .querySelectorAll(
            ".location-tab"
        )
        .forEach(
            tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.location ===
                    locationId
                );

            }
        );


    /*
     * Update panels.
     */

    document
        .querySelectorAll(
            ".location-panel"
        )
        .forEach(
            panel => {

                panel.classList.toggle(
                    "active",
                    panel.dataset.locationPanel ===
                    locationId
                );

            }
        );


    /*
     * Process social embeds.
     */

    setTimeout(
        refreshSocialEmbeds,
        100
    );

}


/* ================================================================
   11. SOCIAL EMBED REFRESH
   ================================================================ */

function refreshSocialEmbeds() {


    /*
     * Instagram
     */

    if (
        window.instgrm &&
        window.instgrm.Embeds
    ) {

        try {

            window.instgrm.Embeds.process();

        } catch (error) {

            console.warn(
                "Instagram embed refresh failed:",
                error
            );

        }

    }


    /*
     * TikTok's embed script observes
     * the page and generally handles
     * dynamically inserted blockquotes.
     *
     * We also trigger a delayed Instagram
     * refresh because content is generated
     * after page load.
     */

    setTimeout(
        () => {

            if (
                window.instgrm &&
                window.instgrm.Embeds
            ) {

                try {

                    window.instgrm.Embeds.process();

                } catch (error) {

                    console.warn(
                        "Instagram refresh failed:",
                        error
                    );

                }

            }

        },
        500
    );

}


/* ================================================================
   12. PHOTO LIGHTBOX
   ================================================================ */

function initializeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const image =
        document.getElementById(
            "lightboxImage"
        );


    const close =
        document.getElementById(
            "lightboxClose"
        );


    if (
        !lightbox ||
        !image ||
        !close
    ) {

        return;

    }


    /*
     * Event delegation because
     * photo cards are dynamically generated.
     */

    document.addEventListener(
        "click",
        event => {


            const photo =
                event.target.closest(
                    ".photo-card"
                );


            if (!photo) {

                return;

            }


            const photoImage =
                photo.querySelector(
                    "img"
                );


            if (!photoImage) {

                return;

            }


            image.src =
                photoImage.src;


            image.alt =
                photoImage.alt;


            lightbox.classList.add(
                "active"
            );


            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        }
    );


    /*
     * Close button.
     */

    close.addEventListener(
        "click",
        closeLightbox
    );


    /*
     * Click outside image.
     */

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /*
     * Escape key.
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }

        }
    );


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        image.src = "";

    }

}


/* ================================================================
   13. INITIALIZE APPLICATION
   ================================================================ */

function initializeApp() {
    // Generate cities.
    renderCityNavigation();
    
    // Render default city.
    renderCity(currentCity);

    // Enable photo viewer.
    initializeLightbox();

    // Process embeds.
    refreshSocialEmbeds();
}


/* ================================================================
   14. START APPLICATION
   ================================================================ */
document.addEventListener("DOMContentLoaded", initializeApp);