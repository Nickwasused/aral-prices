import React from "react";
import stationlist from "../css/stationslist.module.css";
import { get } from "axios";
import button from "../css/button.module.css";
import { isafternow } from "../js/time.js";
import { config } from "../config";
import { NavLink } from "react-router-dom";
import { station_types } from "../data/station_types";

class Stationdetails extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        type: 0,
        remotedata: []
    };

    async writeData() {
        const { id, stationtype } = this.props.match.params;
        let station_data = station_types.stations[stationtype];
        await Promise.all([
            get(
                station_data.url.replace("{id}", id)
            ).then(response => {
                let datatoset = {};
                if (stationtype == 0) {
                    datatoset = response.data.data;
                } else if (stationtype == 1) {
                    datatoset = response.data.response.people;
                }
                console.log(stationtype)
                this.setState({
                    "type": stationtype,
                    "remotedata": datatoset
                });
                localStorage.setItem(`station:data:${id}`, JSON.stringify(
                    {
                        "type": stationtype,
                        "remotedata": datatoset
                    }
                ));
            })
        ]);
        
        let date = new Date();
        date.setHours(
            date.getHours(),
            date.getMinutes() + config.time.station_data_cache,
            0,
            0
        );
        localStorage.setItem(`lastupdate:station:${id}`, date);
    }

    loaddata() {
        const { id } = this.props.match.params;
        this.setState({
            type: JSON.parse(localStorage.getItem(`station:data:${id}`)).type,
            remotedata: JSON.parse(localStorage.getItem(`station:data:${id}`)).remotedata
        });
    }

    getData() {
        const { id } = this.props.match.params;
        if (
            !localStorage.getItem(`station:data:${id}`) ||
            !localStorage.getItem(`lastupdate:station:${id}`)
        ) {
            this.writeData();
        } else {
            const dateLimit = localStorage.getItem(`lastupdate:station:${id}`);
            if (dateLimit !== null && isafternow(dateLimit)) {
                console.log("data is invalid");
                localStorage.removeItem(`station:data:${id}`);
                localStorage.removeItem(`lastupdate:station:${id}`);
                this.writeData();
            } else {
                console.log("data is valid");
                this.loaddata();
            }
        }
    }


    componentDidMount() {
        this.getData();
        // fetch data every 10 minuets
        this.interval = setInterval(
            this.getData.bind(this),
            10 * 1000 * 60
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { id, name } = this.props.match.params;
        let last_load = new Date(localStorage.getItem(`lastupdate:station:${id}`));
        if (last_load.toString() === "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)") {
            last_load = new Date();
        }

        function Header(props) {
            let last_load = props.last_load;
            return (
                <div>
                    <a class="anchor" href="/#" name="#top">
                        Top
                    </a>
                    <table className={stationlist.maintable}>
                        <tr>
                            <td>
                                <h1>{name}</h1>
                            </td>
                        </tr>
                    </table>
                    <center><p>Stand: {`${last_load.getHours()}:${last_load.getMinutes()}`}</p></center>
                </div>
            );
        }

        return (
            <div>
                <a class="anchor" href="/#" name="#top">
                    Top
                </a>
                <NavLink exact to="/" activeClassName="selected">
                    <center><button className={button.button}>Zurück</button></center>
                </NavLink>
                <Header last_load={last_load} />
                <div>
                    <table classname={stationlist.pricetable}>
                        <tr>
                            <td>Kraftstoff</td>
                            <td>Preis in Euro</td>
                            <td>Preisänderung</td>
                        </tr>
                        {
                            this.state.remotedata.map((remote_price) => {
                                console.log(this.state.remotedata)
                                let type = this.state.type;
                                let last_update;
                                let price;
                                let name;
                                if (type == 0) {
                                    // Aral
                                    let time = new Date(new Date(remote_price.price.valid_from).toString() + " UTC");
                                    last_update = `${time.getHours()}:${time.getMinutes()}`;
                                    name = remote_price.name;
                                    if (remote_price.price.price != undefined) {
                                        price = (remote_price.price.price/100).toFixed(2);
                                    } else {
                                        price = `kein Angebot`;
                                        last_update = `-`;
                                    }
                                } else if (type == 1) {
                                    // Star
                                    if (remote_price.listName == "PÄCHTER" | remote_price.identifier.includes("LetzteAktualisierung_")) {
                                        return (
                                            <div></div>
                                        )
                                    }
                                    let tempupdate;
                                    this.state.remotedata.map((remote_price) => {
                                        if (remote_price.identifier.includes("LetzteAktualisierung_"))
                                        tempupdate = remote_price.name;
                                    });
                                    let datefix = tempupdate.match(new RegExp(/Preisangabe zuletzt aktualisiert am [0-9]{1,}.[0-9]{1,}.[0-9]{1,}. um /gm)); 
                                    last_update = tempupdate.replace(datefix, "").replace(" Uhr", "");
                                    let remove_branding = remote_price.identifier.match(new RegExp(/_STAR[0-9]{1,}/g)); 
                                    name = remote_price.identifier.replace(remove_branding, "");
                                    //price = remote_price.name;
                                    price = parseFloat(remote_price.name.replace("€", "").replace(",", ".")).toFixed(2)
                                }
                                return (
                                    <tr>
                                        <td>{name}</td>
                                        <td>{price} €</td>
                                        <td>{last_update} Uhr</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <div className={stationlist.note}>
                    {config.website.author} {new Date().getFullYear()} <br />
                    <NavLink exact to="/privacy" activeClassName="selected">
                        <a>Datenschutzbestimmungen</a>
                    </NavLink>
                    <br />
                    <a href="#top">Nach oben</a>
                </div>
            </div>
        );
    }
}
export default React.memo(Stationdetails);
