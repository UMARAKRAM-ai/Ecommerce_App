import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Card, Row, Col, ListGroup, Button, Image, ListGroupItem } from "react-bootstrap"
// import products from "../product"
import Rating from "../components/Rating"
import axios from 'axios'
const ProductScreen = () => {
    const [product, setProduct]=useState({});

    const {id: productId} = useParams()

    useEffect(()=>{
        const fetchProduct= async()=>{
          const{data}=await axios.get(`http://localhost:5000/api/products/${productId}`)
          setProduct(data)
        }
        fetchProduct()
      },[productId])
    // console.log(product)
  return (
    <>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup>
               <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} Reviews` }/>
                </ListGroupItem>
                <ListGroupItem>Price:{product.price}</ListGroupItem> 
                <ListGroupItem>{product.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col>Price:</Col>
                    </Row>
                    <strong>${product.price}</strong>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>Status</Col>
                    </Row>
                    <strong>{product.countInStock > 0?'In Stock':'Out of Stock'}</strong>
                </ListGroupItem>
                <ListGroupItem>
                    <Button className="btn-block" type="button" disabled={product.countInStock===0}>
                    Add To Cart
                    </Button>

                </ListGroupItem>
            </ListGroup>
            </Card>
        </Col>
      </Row>
      <Link className="btn btn-primary my-3" to='/'>
        Go Back
      </Link>
    </>
  )
}

export default ProductScreen
