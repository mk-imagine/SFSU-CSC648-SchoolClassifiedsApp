import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const SentMessages = () => {
  const [messages, setMessages] = useState([]);
  const base_url = "http://localhost:3100";

  useEffect(() => {
    getSentMessages();
  }, []);

  const userId = 1;
  const getSentMessages = () => {
    axios.get(`${base_url}/msg/${userId}/sent]`).then((res) => {
      setMessages(res.data);
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
