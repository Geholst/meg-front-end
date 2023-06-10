import React, { useState, useEffect } from "react";

const EmergencyContact = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    userId: 1,
    name: "",
    number: "",
    relationship: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChange = (event) => {
    setNewContact({
      ...newContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://meg-backend.herokuapp.com/api/emergency",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContacts([...contacts, data]);
        setNewContact({
          userId: 1,
          name: "",
          number: "",
          relationship: "",
        });
      } else {
        console.error("Error creating emergency contact:", response.status);
      }
    } catch (error) {
      console.error("Error creating emergency contact:", error);
      setNewContact({
        ...newContact,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleOpenModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };

  //   useEffect(() => {
  //     // Fetch existing emergency contacts for the user
  //     const fetchContacts = async () => {
  //       try {
  //         const response = await fetch("http://127.0.0.1:3001/api/emergency");
  //         if (response.ok) {
  //           const data = await response.json();
  //           setContacts(data);
  //         } else {
  //           console.error("Error fetching emergency contacts:", response.status);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching emergency contacts:", error);
  //       }
  //     };

  //     fetchContacts();
  //   }, []);

  return (
    <div>
      <h2>Emergency Contacts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newContact.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            className="form-control"
            id="number"
            name="number"
            value={newContact.number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship:</label>
          <input
            type="text"
            className="form-control"
            id="relationship"
            name="relationship"
            value={newContact.relationship}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Contact
        </button>
      </form>

      {contacts.length === 0 ? (
        <p>No emergency contacts found.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex justify-content-between align-items-center">
              {contact.name}
              <button
                type="button"
                className="btn btn-link"
                onClick={() => handleOpenModal(contact)}>
                View
              </button>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && selectedContact && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedContact.name}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Number: {selectedContact.number}</p>
                <p>Relationship: {selectedContact.relationship}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContact;
