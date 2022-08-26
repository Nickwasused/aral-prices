/** @jsx h */
import { h, Fragment } from "preact";

export const Head = () => (
    <head>
        <link rel="stylesheet" href="/base.css" />
        <link rel="stylesheet" href="/stationlist.css" />
        <link rel="stylesheet" href="/stationstats.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#e0e0d1" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#e0e0d1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nick`s Tank-Preis Liste</title>
    </head>
);

export default ({ children }) => {
    return (
      <Fragment>
        <Head />
        {children}
      </Fragment>
    );
  };