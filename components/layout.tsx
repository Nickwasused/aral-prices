/** @jsx h */
import { h, Fragment } from "preact";

export const Head = () => (
    <head>
        <meta name="description" content="Nick`s Tank Preis Liste" />
        <link rel="stylesheet" href="/base.css" />
        <link rel="stylesheet" href="/stationlist.css" />
        <link rel="stylesheet" href="/stationstats.css" />
        <title>Nick`s Tank Preis Liste</title>
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