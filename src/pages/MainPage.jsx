import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchBar from '../components/SearchBar';
import NumberSelector from '../components/NumberSelector';
import ReactPaginate from 'react-paginate';
import '../styles/PaginationButtons.css'

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setselectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const pageCount = Math.ceil(products.length / productsPerPage);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
    fetchData();
}, []);

useEffect(() => {
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
}, [searchQuery, products]);

const fetchData = async () => {
    try {
        const response = await fetch('https://5fc9346b2af77700165ae514.mockapi.io/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
};

const handleSelectedProducts = (name, price) => {
    const newProduct = { name, price };
    setselectedProducts([...selectedProducts, newProduct]);
};

const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

const handleSearch = (query) => {
    setSearchQuery(query);
};


    return (
        <div className="main-page" style={{ paddingTop: "80px" }}>
            <NavBar onSearch={handleSearch} />
            <div className="content" style={{ marginTop: "20px" }}>
                <Container fluid>
                    <Row>
                        <Col xs={12} lg={3}>
                            <span style={{ display: "flex", alignContent: "left" }}>Sort By</span>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <Form.Check label="Old to new" />
                                    <Form.Check label="New to Old" />
                                    <Form.Check label="Price high to low" />
                                    <Form.Check label="Price low to high" />
                                </Card.Body>
                            </Card>
                            <span style={{ display: "flex", alignContent: "left" }}>Brands</span>
                            <Card style={{ width: '100%', marginTop: '20px' }}>
                                <Card.Body>
                                    <SearchBar />
                                    <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                        <Form>
                                            {products.map((product, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="radio"
                                                    name="sortOption"
                                                    id={`option-${index}`}
                                                    label={product.brand}
                                                />
                                            ))}
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                            <span style={{ display: "flex", alignContent: "left" }}>Model</span>
                            <Card style={{ width: '100%', marginTop: '20px' }}>
                                <Card.Body>
                                    <SearchBar />
                                    <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                        <Form>
                                            {products.map((product, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="radio"
                                                    name="sortOption"
                                                    id={`option-${index}`}
                                                    label={product.model}
                                                />
                                            ))}
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} lg={6}>
                            <Row>
                                {filteredProducts.length > 0
                                    ? filteredProducts.map((product) => (
                                        <Col xs={6} md={3} key={product.id}>
                                            <Card style={{ width: '100%', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                                                <Card.Img variant="top" src={product.image} />
                                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <Card.Title style={{ color: "blue", display: "flex", alignContent: "left" }}>{product.price} ₺</Card.Title>
                                                        <Card.Text style={{ display: "flex", alignContent: "left" }}><strong>{product.name}</strong></Card.Text>
                                                    </div>
                                                    <div>
                                                        <Button variant="primary" style={{ marginTop: '20px' }} className="w-100"
                                                            onClick={() => handleSelectedProducts(product.name, product.price)}>
                                                            Add To Cart
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                    : currentProducts.map((product) => (
                                        <Col xs={6} md={3} key={product.id}>
                                            <Card style={{ width: '100%', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                                                <Card.Img variant="top" src={product.image} />
                                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <Card.Title style={{ color: "blue", display: "flex", alignContent: "left" }}>{product.price} ₺</Card.Title>
                                                        <Card.Text style={{ display: "flex", alignContent: "left" }}><strong>{product.name}</strong></Card.Text>
                                                    </div>
                                                    <div>
                                                        <Button variant="primary" style={{ marginTop: '20px' }} className="w-100"
                                                            onClick={() => handleSelectedProducts(product.name, product.price)}>
                                                            Add To Cart
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                previousClassName={'pagination-prev'}
                                nextClassName={'pagination-next'}
                                pageClassName={'pagination-page'}
                                pageLinkClassName={'pagination-link'}
                                previousLinkClassName={'pagination-link'}
                                nextLinkClassName={'pagination-link'}
                            />
                        </Col>
                        <Col xs={12} lg={3}>
                            <span style={{ display: "flex", alignContent: "left" }}>Cart</span>
                            <Card style={{ width: '100%', marginBottom: "20px" }}>
                                <Card.Body>
                                    {selectedProducts.map((product, index) => (
                                        <Row xs="auto" key={index}>
                                            <Col>
                                                <span style={{ marginRight: "40px" }}>{product.name}<br /> {product.price}₺</span>
                                            </Col>
                                            <Col>
                                                <NumberSelector />
                                            </Col>
                                        </Row>
                                    ))}
                                </Card.Body>
                            </Card>
                            <span style={{ display: "flex", alignContent: "left" }}>Checkout</span>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <Row>
                                        <span style={{ display: "flex", alignContent: "left" }}>Total Price: 117.000 ₺</span>
                                        <Button style={{ width: "250px", marginLeft: "13px" }} variant="primary">Checkout</Button>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default MainPage;
