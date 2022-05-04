import 'https://statics.teams.cdn.office.net/sdk/v1.11.0/js/MicrosoftTeams.min.js';

function setTheme (theme) {
    const el = document.documentElement;
    el.setAttribute('data-theme', theme); // switching CSS
};


// async function returns true if we're running in Teams
export async function inTeams() {
    return (window.parent === window.self && window.nativeInterface) ||
        window.navigator.userAgent.includes("Teams/") ||
        window.name === "embedded-page-container" ||
        window.name === "extension-tab-frame";
}

microsoftTeams.initialize(() => {
    // Set the CSS to reflect the current Teams theme
    microsoftTeams.getContext((context) => {
        setTheme(context.theme);
    });
    // When the theme changes, update the CSS again
    microsoftTeams.registerOnThemeChangeHandler((theme) => {
        setTheme(theme);
    });
});