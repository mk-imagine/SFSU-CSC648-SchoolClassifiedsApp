import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

/**
 * Loads table with all sent messages by User ID
 * @returns HTML table with all sent messages by User ID
 */
const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  // const base_url = "/api"; // FOR DEPLOYMENT
  const base_url = "http://localhost:3100/api";
  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);

  useEffect(() => {
    getSentMessages();
  }, []);

  const userId = user_in_json.user_id;
  const getSentMessages = () => {
    axios.get(`${base_url}/msg/${userId}/sent`).then((res) => {
      setMessages(res.data);
      console.log("messages are ", messages);
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
                <th>Reciever Name</th>
                <th>Message</th>
                <th>Reciever Email</th>
                <th>Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((e) => {
                const fullName = e.RecFName + " " + e.RecLName;
                return (
                  <tr>
                    <td>{e.ItemName}</td>
                    <td>{fullName}</td>
                    <td>{e.Message}</td>
                    <td>{e.RecEmail}</td>
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

export default SentMessages;
