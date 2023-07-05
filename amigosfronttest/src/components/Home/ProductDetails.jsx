import React, {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { styled } from 'styled-components';
import { FaCartPlus } from "react-icons/fa";



import { currencyFormat } from '../../Tools/currencyFormat';
import fetcher from '../../Helpers/fetcher';

function ProductDetails() {


    const navigate = useNavigate();

    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetcher.get(`/api/v1/products/${id}`);
                if(response){
                    setSelectedProduct(response);

                }
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id]);

    const handleAddToCart = () => {
        toast.success(`${selectedProduct?.name} (${quantity} unités) ajouté au panier. 🛒`);
        addToCart(selectedProduct, quantity);
    }

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <>
            <>
                <DIV_ProductDetails_Container>
                    <img className="img" src={selectedProduct?.img_src} alt={selectedProduct?.name} />
                    <h2><b>Nom du produit:</b> {selectedProduct?.name}</h2>
                    <p><b>Prix du produit:</b> {currencyFormat(selectedProduct?.price)}</p>
                    <p><b>Type du produit:</b> {selectedProduct?.type}</p>
                    <p><b>Identifiant du produit :</b> {selectedProduct?.id}</p>
                    <h2 htmlFor="quantity">Quantité :</h2>
                    <div className="quantity-container">
                        <div className="quantity-input">
                            <button   onClick={decrementQuantity}>-</button>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                min={1}
                                max={100}
                                step={1}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                            <button   onClick={incrementQuantity}>+</button>
                        </div>
                    </div>
                    <button   onClick={handleAddToCart} width="50%" height="100px">
                        <FaCartPlus /> Ajouter au panier <FaCartPlus />
                    </button>
                </DIV_ProductDetails_Container>
                <button   onClick={handleGoBack}>Retour</button>
            </>
        </>
    );
}

export default ProductDetails;

const DIV_ProductDetails_Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: left;
margin: 20px;
min-height: 250px;
gap: 2%;

.img {
width: 25%;
height: auto;
object-fit: cover;
}

.quantity-container {
display: flex;
align-items: center;
}

.quantity-input {
display: flex;
align-items: center;
gap: 10px;
}
`;