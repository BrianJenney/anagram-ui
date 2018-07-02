import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
    state = {
        anagram: { anagrams: [], twoWords: [] },
        userSearch: "",
        searching: false
    };

    handleChange = e => {
        this.setState({ userSearch: e.target.value });
    };

    getAnagram = () => {
        this.searchingState(true);
        axios
            .get(
                `https://anagram-services.herokuapp.com/anagram?word=${
                    this.state.userSearch
                }`
            )
            .then(response => {
                this.setState({ anagram: response.data });
                this.searchingState(false);
            });
    };

    searchingState = bool => {
        this.setState({ searching: bool });
    };

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="text-center mt-2">Anagrammer</h1>
                </div>

                <input
                    className="form-control w-50 m-auto text-center"
                    placeholder="Enter a word (ex: bewildered)"
                    type="text"
                    onChange={this.handleChange}
                />

                <div className="form-row text-center mb-3">
                    <div className="col-12">
                        <button
                            disabled={this.state.userSearch.length < 3}
                            className="btn btn-outline-success mt-2 text-center"
                            onClick={this.getAnagram}
                        >
                            Get Anagrams
                        </button>
                    </div>
                </div>

                <div className="searching">
                    {this.state.searching && <span className="fa fa-spinner" />}
                </div>

                <div>
                    {this.state.anagram.anagrams.length === 0 &&
                        this.state &&
                        this.state.anagram.success === false && (
                            <div className="text-center">
                                <h3 className="text-muted">
                                    Sorry Charlie, can't find an anagram with
                                    the text you provided.
                                </h3>
                            </div>
                        )}
                </div>

                <div className="mt-3 w-75 m-auto">
                    {this.state.anagram.anagrams.length > 2 && (
                        <div>
                            <p className="text-muted text-center">
                                <b>Anagram (More than 2 words): </b>
                                {this.state.anagram.anagrams.join(", ")}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-3 w-75 m-auto">
                    {this.state.anagram.twoWords.length > 0 && (
                        <div>
                            <p className="text-muted text-center">
                                <b>Anagram (2 words): </b>
                                {this.state.anagram.twoWords.join(", ")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
