import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../actions/productsAction";
import Loading from "../../components/Loading";
import ErroMessage from "../../components/ErroMessage";
import ReactMarkdown from "react-markdown";

function CreateProduct({ history }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  console.log(product);

  const resetHandler = () => {
    setName("");
    setDescription("");
    setQuantity("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductAction(name, description, quantity));
    if (!name || !description || !quantity) return;

    resetHandler();
    history.push("/products");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Add New Product">
      <Card>
        <Card.Header>New Product</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErroMessage variant="danger">{error}</ErroMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name Of Product</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the name of product"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description of Product</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Enter the description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>Description Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="quantity"
                value={quantity}
                placeholder="Enter the quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <br />
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Add Product
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default CreateProduct;
