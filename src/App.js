// React
import React, { Component } from "react";
// Components
import Button from "./components/Button";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserNameFinal: false,
            messages: [],
            newMessage: "",
            userName: ""
        };
    }

    fetchMessages() {
        fetch("https://react-workshop-ipbeja.firebaseio.com/messages.json")
            .then(resp => resp.json())
            .then(data => {
                const messages = [];
                Object.keys(data).forEach(function(key) {
                    messages.push(data[key]);
                });

                this.setState({ messages: messages });
            });
    }

    sendMessage() {
        fetch("https://react-workshop-ipbeja.firebaseio.com/messages.json", {
            method: "POST",
            body: JSON.stringify({
                user: this.state.userName,
                message: this.state.newMessage,
                date: Date.now()
            })
        });
    }

    render() {
        const messages = this.state.messages;
        return this.state.isUserNameFinal ? (
            <div>
                {this.state.messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <div>{"User: " + message.user}</div>
                            <div>{"Message: " + message.message}</div>
                        </div>
                    );
                })}
                <Button
                    text="Refresh messages"
                    onButtonClick={() => {
                        this.fetchMessages();
                    }}
                />
                <div>
                    <textarea
                        onChange={e => {
                            this.setState({ newMessage: e.target.value });
                        }}
                    />
                    <Button
                        text="Send message"
                        onButtonClick={() => {
                            this.sendMessage();
                        }}
                    />
                </div>
            </div>
        ) : (
            <div>
                <input
                    type="text"
                    placeholder="User name"
                    onChange={e => this.setState({ userName: e.target.value })}
                />
                <Button
                    text="Confirm user name"
                    onButtonClick={() =>
                        this.setState({ isUserNameFinal: true })
                    }
                />
            </div>
        );
    }
}

export default App;
