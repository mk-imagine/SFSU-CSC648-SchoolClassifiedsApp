import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

/**
 * Loads table with all sent messages by User ID
 * @returns HTML table with all sent messages by User ID
 */
const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  // const base_url = "/api";
  const base_url = "http://localhost:3100/api";

  useEffect(() => {
    getSentMessages();
  }, []);

  const userId = 1;
  const getSentMessages = () => {
    axios.get(`${base_url}/msg/${userId}/sent]`).then((res) => {
      setMessages(res.data);
      console.log(messages);
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
                const fullName = e.RecFName + " " + e.RecLName;
                return (
                  <tr>
                    <td>{e.Item}</td>
                    <td>{e.LName}</td>
                    <td>{e.Message}</td>
                    <td>sender@gmail.com</td>
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
