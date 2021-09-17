import React from "react";
import parse from "html-react-parser";
import stationslist from "../css/stationslist.module.css";
import { NavLink } from "react-router-dom";
import { config } from "../config";
import { stations } from "../data/stations";

class Gasstations extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        stations: [],
        inputValue: ""
    };

    FilterOnChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.setState({
            stations: stations.stations
        });
    }

    render() {
        function Header(props) {
            const stations = props.stations;
            return (
                <div>
                    <a class="anchor" href="/#" name="#top">
                        Top
                    </a>
                    <NavLink exact to="/settings" activeClassName="selected">
                        <div class="settingsicon">
                            <i class="fa fa-cog"></i>
                        </div>
                    </NavLink>
                    <table className={stationslist.maintable}>
                        <tr>
                            <td>
                                <h1>Tankstellen: {stations}</h1>
                            </td>
                        </tr>
                    </table>
                </div>
            );
        }

        let filteredstations = this.state.stations.filter((station) => {
            let { name } = station;
            if (
                name.match(new RegExp(this.state.inputValue.toLocaleLowerCase(), "gi"))
            ) {
                return (
                    name
                );
            } else {
                return null;
            }
        });

        return (
            <div>
                <div class="head">
                    <Header
                        stations={filteredstations.length}
                    />
                    <br />
                        <div className={stationslist.searchcombo}>
                            <input
                                type="text"
                                placeholder="Tankstelle"
                                value={this.state.inputValue}
                                onChange={this.FilterOnChange}
                            />
                            <span classname={stationslist.searchcombobutton}><i class="fa fa-search"></i></span>
                        </div>
                </div>
                <ul className={stationslist.stationlist}>
                    {filteredstations.map((station) => {
                        const {
                            id,
                            name
                        } = station;

                        return (
                            <li className={stationslist.item} key={id}>
                                <NavLink
                                    exact
                                    to={
                                        "/station/" +
                                        id +
                                        "/" +
                                        name
                                    }
                                    activeClassName="selected"
                                >
                                {name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div className={stationslist.note}>
                    {config.website.author} {new Date().getFullYear()} |{" "}
                    {parse(config.website.footer_text)} <br />{" "}
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
export default React.memo(Gasstations);
