import { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// queste sono le propietà che si aspetterà di ricevere il server da noi
// ogni qualvolta invieremo una nuova prenotazione

// name <-- string
// phone <-- string/number
// numberOfPeople <-- string/number
// smoking <-- boolean
// dateTime <-- date/string
// specialRequests <-- string

// il nostro scopo sarà quello di legare tutti gli input allo STATE interno al componente
// lo stato dovrà modificarsi contemporaneamente all'inserimento del dato nell'input
// e l'input dovrà leggere il valore dallo stato

// un input di tipo "controlled" (controllato) necessita di un doppio collegamento, da e verso lo stato
// TWO-WAY DATA BINDING

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: 1,
      smoking: false,
      dateTime: "",
      specialRequests: ""
    }
  };

  handleChange = (propertyName, propertyValue) => {
    // propertyName sarà una dei nomi degli input: "name", "phone", "numberOfPeople", ecc..
    // propertyValue sarà una tra e.target.value || e.target.checked

    // stiamo controllando se siamo nell'input "numberOfPeope" per decidere se fare il parseInt del numero o meno
    const value = propertyName === "numberOfPeople" ? parseInt(propertyValue) : propertyValue;

    this.setState({
      reservation: {
        ...this.state.reservation,
        [propertyName]: value
        // le parentesi quadre nel contesto di un'oggetto permettono la valutazione di un valore dinamico
        // [propertyName] acquisirà come valore una delle stringhe che abbiamo passato come primo parametro
      }
    });
  };

  // handleSubmit = e => {
  //   e.preventDefault();

  //   fetch("https://striveschool-api.herokuapp.com/api/reservation", {
  //     method: "POST",
  //     body: JSON.stringify(this.state.reservation),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       console.log(response);
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         alert("qualcosa è andato storto con la richiesta");
  //       }
  //     })
  //     .then(parsedBody => {
  //       console.log(parsedBody);
  //       alert("La tua richiesta è andata a buon fine, la risorsa è stata creata con id " + parsedBody._id);
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });

  //   console.log(e);
  // };
  handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
        method: "POST",
        body: JSON.stringify(this.state.reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const parsedBody = await response.json();
        alert("La tua richiesta è andata a buon fine, la risorsa è stata creata con id " + parsedBody._id);
      } else {
        alert("qualcosa è andato storto con la richiesta");
      }
    } catch (err) {
      alert("ERRORE FATALE", err);
    }

    console.log(e);
  };

  render() {
    // const obj = { name: "Stefano", surname: "Miceli" };
    // const objectCopy = { ...obj, surname: "Macis" };
    // console.log(objectCopy);

    return (
      <Container>
        <Row className="justify-content-center  mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center">Prenota il tuo tavolo qui:</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  // value legge DALLO stato
                  value={this.state.reservation.name}
                  // l'onChange permette la modifica dello stato
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({
                    //   reservation: {
                    //     // lo spread operator ci aiuta a mantenere una copia dei dati presenti nello this.state.reservation
                    //     // per non perdere la struttura originaria del nostro stato, mantenendo tutti i dati raccolti fino a quel momento
                    //     ...this.state.reservation,
                    //     name: e.target.value
                    //   }
                    // });

                    this.handleChange("name", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Telefono / Cell</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Inserisci il tuo numero di telefono"
                  value={this.state.reservation.phone}
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({ reservation: { ...this.state.reservation, phone: e.target.value } });
                    this.handleChange("phone", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Numero di persone al tavolo</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={this.state.reservation.numberOfPeople}
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({
                    //   reservation: { ...this.state.reservation, numberOfPeople: parseInt(e.target.value) }
                    // });
                    this.handleChange("numberOfPeople", e.target.value);
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  checked={this.state.reservation.smoking}
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({ reservation: { ...this.state.reservation, smoking: e.target.checked } });
                    this.handleChange("smoking", e.target.checked);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data e Ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={this.state.reservation.dateTime}
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({ reservation: { ...this.state.reservation, dateTime: e.target.value } });
                    this.handleChange("dateTime", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Richieste Speciali</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={5}
                  placeholder="Allergie, intolleranze, richieste per bambini..."
                  value={this.state.reservation.specialRequests}
                  onChange={e => {
                    console.log(e.target.value);

                    // this.setState({ reservation: { ...this.state.reservation, specialRequests: e.target.value } });
                    this.handleChange("specialRequests", e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="d-block mx-auto">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ReservationForm;
