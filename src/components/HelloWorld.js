import React, { useEffect, useReducer } from "react";
//import socketIOClient from "socket.io-client";
const io = require('socket.io-client')

const socket = io('http://localhost:3001')

const reducer = (state, action) => {
    switch (action.type) {
        case "add_tweet":
            return {
                ...state,
                ret_data: [action.payload, ...state.ret_data],
            };
        default:
            return state;
    }
};

const Navbar = () => {
    var ret_data = "initial data"

    const initialState = {
        ret_data: "initial data"
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    //const { ret_data } = state;

    console.log("start get data")

    useEffect(() => {

        console.log("CLIENT-useEffect Start")
        socket.on("connect", () => {
            console.log("CLIENT-CONNECT")
        });
        socket.on("disconnect", () => {
            console.log("CLIENT-DISCONNECT")
        });
        socket.on("stuff", (json) => {
            if (json.data) {
                dispatch({ type: "add_tweet" });
                console.log("json data exists")
            } else {
                console.log("no json data")
            }
        });

        /*
        console.log("start get data2")
        let socket;
    
        if (process.env.NODE_ENV === "development") {
            console.log("start get data3")
            socket = socketIOClient("http://localhost:3001");
        } else {
            console.log("start get data4")
            socket = socketIOClient("/");
        }
    
        console.log("get data 5")
        socket.on("connect", () => {
            console.log("CONNECT")
        });
        socket.on("connection", () => {
            console.log("CONNECTION")
        });
        console.log("start get data6")
        socket.on("stuff", (json) => {
            if (json.data) {
                dispatch({type: "add_tweet"});
                console.log("json data exists")
                } else {
                    console.log("no json data")
                }
        });
        console.log("start get data7")
        socket.on("heartbeat", (data) => {});
        console.log("start get data8")
        socket.on("error", (data) => {});
        console.log("start get data9")
        socket.on("authError", (data) => {
            console.log("data =>", data);
        });
        */
    }, []);

    return (
        <div className="HelloWorld">
            Hello World
            {ret_data}
        </div>
    );
};

export default Navbar;