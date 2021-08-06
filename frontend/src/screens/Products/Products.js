import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productsAction";
import Loading from "../../components/Loading";
import ErroMessage from "../../components/ErroMessage";

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  console.log(products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.first_name}..`}>
      <Link to="createproduct">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add Product
        </Button>
      </Link>
      {error && <ErroMessage variant="danger">{error}</ErroMessage>}
      {loading && <Loading />}
      {products?.reverse().map((product) => (
        <Table key={product._id} striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>
                <Button variant="danger" className="mx-2">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      ))}
    </MainScreen>
  );
};

export default Products;
