import { Component } from "react";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Container, Row, Col, Carousel, ListGroup, Badge } from "react-bootstrap";
import menu from "../data/menu.json";
// lo STATE è utilizzabile solo in componenti a CLASSE!

// Per far rispecchiare la lista di commenti/recensioni con il piatto selezionato
// abbiamo bisogno di fare uso di una memoria interna (lo STATE) che sarà propria del componente stesso
// visibile solo all'interno di esso, NON esternamente!
class Home extends Component {
  state = {
    firstStateValue: 345, // valore inutilizzato, ci serve solo per vedere che setState preserva gli elementi esistenti dello stato quando cambiamo una proprietà diversa
    selectedPasta: null // null è il valore iniziale che cambierà in un oggetto del piatto
  };

  // l'unico modo, al momento, che possa resettare lo stato a "null" è il refresh della pagina
  // selectedPasta cambierà nel momento in cui l'utente cliccherà su una slide (vedi Carousel.Item)

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <h1>Benvenuti nel nostro Ristorante {this.state.firstStateValue}</h1>
            <p>Abbiamo primi piatti, primi piatti o primi piatti...</p>

            <Carousel>
              {menu.map(pasta => (
                <Carousel.Item
                  key={pasta.id}
                  onClick={e => {
                    console.log("clicked", pasta.name, e);
                    this.setState({
                      selectedPasta: pasta
                    });

                    // per modificare lo stato, dovrete necessariamente usare il metodo della classe this.setState()
                    // lo stato non è modificabile direttamente (!!! this.state = {} !!!) pena, il non aggiornamento automatico dell'interfaccia
                    // a setState dovrete passare un'oggetto con le proprietà che volete cambiare
                  }}
                >
                  <img className="d-block w-100" src={pasta.image} alt={pasta.name} />
                  <Carousel.Caption>
                    <h3>{pasta.name}</h3>
                    <p>{pasta.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        {/* <Row className="justify-content-center mt-4">
          <Col xs={"auto"} className="text-center">
            <Button variant="primary" onClick={() => this.setState({ selectedPasta: null })}>
              Reset Comments
            </Button>
          </Col>
        </Row> */}

        {/* short circuit operator, se il valore a sinistra del && è falsy quello che c'è a destra non verrà eseguito*/}
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            {/* <h4>Recensioni per {this.state.selectedPasta.name}</h4> */}
            <ListGroup>
              {/* lo short circuit farà sì che comments non venga letto prima che selectedPasta esista e sia un oggetto */}
              {this.state.selectedPasta ? (
                this.state.selectedPasta.comments.map(elem => (
                  <ListGroup.Item key={`comment-${elem.id}`}>
                    <Badge bg="dark" className="me-2">
                      {elem.author}
                    </Badge>
                    {elem.comment}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item> Nessun elemento da visualizzare, clicca su un elemento del carosello</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
