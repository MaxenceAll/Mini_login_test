import React, { useEffect, useState } from 'react';
import ProductList from '../Components/Home/ProductList';
import fetcher from '../Helpers/fetcher';


function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetcher.get(`/api/v1/products`);
        if (response.data !== null) {
          setProducts(response);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };
    getData();
  }, []);

  return (<>
    <ProductList products={products} />
  </>);
}

export default Home;
