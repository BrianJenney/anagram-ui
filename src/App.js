import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        anagram: null,
        userSearch: ""
    };

    handleChange = e => {
        this.setState({ userSearch: e.target.value });
    };

    getAnagram = () => {
        axios
            .get(
                `https://anagram-services.herokuapp.com/anagram?word=${
                    this.state.userSearch
                }`
            )
            .then(response => {
                this.setState({ anagram: response.data });
            });
    };

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="text-center mt-2">Anagrammer</h1>
                </div>

                <input
                    className="form-control w-50 m-auto"
                    type="text"
                    onChange={this.handleChange}
                />

                <div className="form-row text-center">
                    <div className="col-12">
                        <button
                            disabled={this.state.userSearch.length < 3}
                            className="btn btn-outline-success mt-2 text-center"
                            onClick={this.getAnagram}
                        >
                            Search Anagrams
                        </button>
                    </div>
                </div>

                <div>
                    {this.state.anagram &&
                        !this.state.anagram.success && (
                            <div className="text-center">
                                <h3 className="text-muted">
                                    Sorry Charlie, can't find an anagram with
                                    the text you provided.
                                </h3>
                            </div>
                        )}
                </div>

                <div className="anagrams">
                    {this.state.anagram &&
                        this.state.anagram.anagrams.map((word, idx) => {
                            return (
                                <div className="text-center">
                                    <div key={idx}>{word}</div>
                                </div>
                            );
                        })}

                    <div className="mt-3">
                        {this.state.anagram &&
                            this.state.anagram.twoWords.map((word, idx) => {
                                return (
                                    <div className="text-center">
                                        <div key={idx}>{word}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
