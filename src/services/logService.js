import * as Sentry from "@sentry/browser";

function init() {
    Sentry.init({ dsn: "https://c198920f447546cbb2c57b12507ea89c@sentry.io/1777758" });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init, log
}