import React from "react";
import { Form, Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

const Dating = () => {
  return (
    <div className="bg-dark text-white">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="w-75">My eGuardian</h1>
        <div
          className="rounded-circle bg-light"
          style={{ width: "25%", paddingTop: "25%" }}>
          <p className="text-center">Who are you dating?</p>
        </div>
      </header>
      <h2 className="text-center mt-4">Online Dating? Who is this person?</h2>
      <Form className="d-flex flex-column align-items-start p-3">
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>App Found On:</Form.Label>
          <Form.Control type="text" name="foundon" />
        </Form.Group>
        <Form.Group>
          <Form.Label>LP#:</Form.Label>
          <Form.Control type="text" name="licensePlate" />
        </Form.Group>
        <div className="form-row">
          <div className="col">
            <Form.Group>
              <Form.Label>Year:</Form.Label>
              <Form.Control as="select" name="year">
                {Array.from({ length: 2023 - 1950 + 1 }, (_, index) => {
                  const year = 2023 - index;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group>
              <Form.Label>Make:</Form.Label>
              <Form.Control type="text" name="make" />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group>
              <Form.Label>Model:</Form.Label>
              <Form.Control type="text" name="model" />
            </Form.Group>
          </div>
        </div>
        <Form.Group>
          <Form.Label>Upload Image:</Form.Label>
          <Form.Control type="file" name="image" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Unique Identifiable Features/Tattoos?</Form.Label>
          <Form.Control as="textarea" rows={3} name="features" />
        </Form.Group>
        <Button className="m-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form className="p-3">
        <h3 className="text-center mt-4">BDE - Bad Date Emergency!</h3>
        <Form.Group>
          <Form.Label>One Tap Interruption Call:</Form.Label>
          <div className="d-flex justify-content-center">
            <Form.Check
              type="switch"
              id="interruptionCall"
              name="interruptionCall"
              label=""
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>One Tap Pre-Programmed Text:</Form.Label>
          <div className="d-flex justify-content-center">
            <Form.Check
              type="switch"
              id="preProgrammedText"
              name="preProgrammedText"
              label=""
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Text:</Form.Label>
          <div className="border rounded p-2">
            <Form.Control as="textarea" rows={3} name="text" />
          </div>
        </Form.Group>
        <Button className="m-2" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form className="p-3">
        <h3 className="text-center mt-4">Home Safety</h3>
        <Form.Group>
          <Form.Label>Notify I.C.E if left home parameters:</Form.Label>
          <div className="d-flex justify-content-center">
            <Form.Check type="switch" id="lefthome" name="lefthome" label="" />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Dating;
