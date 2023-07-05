import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { currencyFormat } from '../../Tools/currencyFormat';

function ProductList( {products}) {

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

    const [selectedType, setSelectedType] = useState(null);
    const types = [...new Set(products.map(item => item.type))];
  
    const handleCheckboxChange = (type) => {
      if (selectedType === type) {
        setSelectedType(null);
      } else {
        setSelectedType(type);
      }
    };
  
    const filteredData = selectedType
      ? products.filter(product => product.type === selectedType)
      : products;

    return (
        <>
            <>
                <DIV_Home_Container>
                    <div style={{textAlign:"start"}}>
                        <h2>Catégories:</h2>
                        <div>
                            <input
                                type="radio"
                                id="all"
                                checked={!selectedType}
                                onChange={() => setSelectedType(null)}
                            />
                            <label htmlFor="all">Tous</label>
                        </div>
                        {types.map(type => (
                            <div key={type}>
                                <input
                                    type="checkbox"
                                    id={type}
                                    checked={selectedType === type}
                                    onChange={() => handleCheckboxChange(type)}
                                />
                                <label htmlFor={type}>{type.charAt(0).toLocaleUpperCase() + type.slice(1)}</label>
                            </div>
                        ))}
                    </div>

                    <DIV_Card_Container>
                        {filteredData.map(product => (
                            <Card key={product.name}>
                                <DIV_Card_img>
                                    <img src={product.img_src} alt={product.name} className="card-img" />
                                </DIV_Card_img>
                                <DIV_Card_body>
                                    <b>{product.name}</b>{currencyFormat(product.price)}
                                </DIV_Card_body>
                                <Link to={`/produit/${product.id}`}>
                                    <button  >Voir produit</button>
                                </Link>
                            </Card>
                        ))}
                    </DIV_Card_Container>

                </DIV_Home_Container>
            </>
        </>
    )
}

export default ProductList

const DIV_Home_Container = styled.div`
  display: grid;
  grid-template-columns: 15% 80%;
  grid-template-areas: "Filter ProductList";
  grid-gap: 20px;
  margin: 20px;
  min-height: 250px;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  padding: 2%;
`;

const DIV_Card_Container = styled.div`
  width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    margin: 20px;
    min-height: 250px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    padding: 2%;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 245px, rgba(0, 0, 0, 0.08) 0 0 0 2px;
`;

const DIV_Card_img = styled.div`
  .card-img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    transition: transform 0.3s ease;    
    &:hover {
      transform: scale(1.7);
    }
  }
`;

const DIV_Card_body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;