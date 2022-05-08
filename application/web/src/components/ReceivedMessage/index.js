import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

/**
 * Loads table with all received messages by User ID
 * @returns HTML table with all received messages by User ID
 */
const ReceivedMessages = () => {
  const [messages, setMessages] = useState([]);
  // const base_url = "/api"; // FOR DEPLOYMENT
  const base_url = "http://localhost:3100/api";
  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);

  useEffect(() => {
    getReceivedMessages();
  }, []);

  const userId = user_in_json.user_id;
  const getReceivedMessages = () => {
    console.log("Testing by using user id 2");
    axios.get(`${base_url}/msg/2/received`).then((res) => {
      setMessages(res.data);
      console.log("Received Messages: ", messages);
    });
  };

  return (
    <div>
      <div>
        <div style={{ height: "38rem", width: "100%", padding: "2rem" }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Sender Name</th>
                <th>Message</th>
                <th>Sender Email</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((e) => {
                console.log(e);
                const fullName = e.SendFName + " " + e.SendLNamee;
                return (
                  <tr>
                    <td>{e.ItemName}</td>
                    <td>{fullName}</td>
                    <td>{e.Message}</td>
                    <td>{e.SendEmail}</td>
                    <td>{e.ContactInfo}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessages;
